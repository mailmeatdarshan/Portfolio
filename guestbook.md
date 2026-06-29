# Guestbook Feature — Implementation Plan (v2)

## What it Does
A `/guestbook` page where visitors leave a name + message — **no login required**. Messages are stored in **Firebase Firestore** and appear in realtime. A preview strip of recent messages also appears on the **homepage** just before the Contact section. An admin can delete messages via a **secret URL**.

---

## User Review Required

> [!IMPORTANT]
> **Firebase Setup Needed**: I need your 4 Firebase env vars to wire up the database:
> - `NEXT_PUBLIC_FIREBASE_API_KEY`
> - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
> - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
> - `NEXT_PUBLIC_FIREBASE_APP_ID`
>
> If you don't have a Firebase project yet, go to [console.firebase.google.com](https://console.firebase.google.com), create a project, add a **Web App**, enable **Firestore Database** (in production mode), and paste the config values here.

> [!IMPORTANT]
> **Admin Secret Key**: I'll create an admin panel at `/guestbook/admin?key=YOUR_SECRET`. You choose the secret key (any random string, e.g. `darshan2025secure`). Store it in `.env.local` as `ADMIN_SECRET_KEY`. What should it be?

---

## Proposed Changes

### Firebase Setup

#### [NEW] `src/lib/firebase.ts`
- Initialize Firebase app with Firestore
- Export `db` Firestore instance (client-side, uses `NEXT_PUBLIC_*` env vars)

#### [NEW] `src/lib/guestbook.ts`
- `addEntry(name, handle, message)` — write to Firestore `guestbook` collection
- `getEntries()` — fetch latest entries (server-side, for SSR)
- `deleteEntry(id)` — delete a document by ID (used by admin panel)
- `subscribeToEntries(callback)` — realtime `onSnapshot` listener for client

#### [NEW] `.env.local` entries (you fill in)
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
ADMIN_SECRET_KEY=your_chosen_secret
```

---

### Guestbook Page

#### [NEW] `src/app/guestbook/page.tsx`
Full `/guestbook` route:
- **Own Navbar-free header** with back-to-home link (Navbar will be hidden here like `/about`)
- **Form**: Name + optional `@handle` field + message textarea (280 char limit with live counter)
- **Message feed**: Newest first, realtime via `onSnapshot`
- **Each message card**: Name initials avatar circle (colored by a hash of name), name, handle, message, relative time ("2 hours ago")
- **Empty state**: "Be the first to leave a message! 🚀" styled card
- **Rate limiting**: Submit button disabled 30s after posting (localStorage flag)
- **Space Mode**: Dark glassmorphism, dot-grid backdrops, glow accents
- **Earth Mode**: Cream paper, handwriting font, dashed borders, sticky-note-style cards

#### [NEW] `src/app/guestbook/admin/page.tsx`
Hidden admin panel at `/guestbook/admin?key=SECRET`:
- Validates `key` query param against `ADMIN_SECRET_KEY` env var (server-side check via a Server Action)
- Shows full list of all messages with a 🗑 **Delete** button per entry
- No fancy UI — functional dark table view
- Incorrect key → redirect to `/guestbook`

#### [NEW] `src/app/guestbook/actions.ts`
Next.js Server Actions:
- `addGuestbookEntry(formData)` — server-side validation + Firestore write
- `deleteGuestbookEntry(id, key)` — validates admin key, then deletes from Firestore

---

### Homepage Preview Strip

#### [NEW] `src/components/GuestbookPreview.tsx`
A horizontal scrolling strip / card row showing the **5 most recent messages**, placed **just before the Contact section** on the homepage:
- Section heading: `"What people are saying"` or `"Guestbook"` in the same style as other homepage sections
- Each card: initials avatar + name + message snippet (truncated at 80 chars) + time
- A **"Sign the Guestbook →"** CTA button linking to `/guestbook`
- **Space Mode**: Horizontal auto-scrolling infinite marquee of cards (like the skills section)
- **Earth Mode**: Horizontally scrollable row of paper-style cards

#### [MODIFY] `src/app/page.tsx`
- Import and add `<GuestbookPreview />` just before `<Contact />`

---

### Navigation

#### [MODIFY] `src/components/Navbar.tsx`
- Add `{ name: "Guestbook", href: "/guestbook" }` to `navLinks`
- Extend the Navbar-hide condition: `if (pathname === "/about" || pathname.startsWith("/guestbook")) return null`

---

## Visual Design Sketch

### Space Mode — `/guestbook`
```
[ ← Back ]         ✦ GUESTBOOK // MESSAGES

  Leave a trace in the cosmos...
  ┌──────────────────────────────────────────────┐
  │  Name *          @handle (optional)          │
  │  [____________]  [@_________________________]│
  │  Message *                              0/280│
  │  [__________________________________________]│
  │  [__________________________________________]│
  │                              [ → Transmit ] │
  └──────────────────────────────────────────────┘

  — 42 messages —

  ┌── D ── @darshan · 2h ago ───────────────────┐
  │  "This portfolio is absolutely 🔥🔥"        │
  └─────────────────────────────────────────────┘
  ┌── A ── Anonymous · 1d ago ──────────────────┐
  │  "Love the Zen mode! Ship it!"              │
  └─────────────────────────────────────────────┘
```

### Homepage Preview Strip (before Contact)
```
                  Guestbook
         What visitors are saying ✦

  ┌───────────────┐ ┌────────────────┐ ┌───────────────┐
  │ D  Darshan    │ │ A  Anonymous   │ │ K  Karan      │
  │ "Insane UI 🔥"│ │ "Loved Zen!"   │ │ "10/10 bhai"  │
  │ 2h ago        │ │ 1d ago         │ │ 3d ago        │
  └───────────────┘ └────────────────┘ └───────────────┘

              [ Sign the Guestbook → ]
```

---

## Verification Plan

### Automated
- `npx tsc --noEmit` — zero TypeScript errors
- `npm run build` — production build passes

### Manual
1. `/guestbook` loads in both Space + Earth modes ✓
2. Submit a valid message → appears in feed realtime ✓
3. Open second tab → message appears there too (realtime) ✓
4. Empty fields → validation error ✓
5. 280+ chars → char counter red, submit disabled ✓
6. Submit button disabled 30s after posting ✓
7. Homepage shows the strip before Contact ✓
8. `/guestbook/admin?key=wrongkey` → redirects to `/guestbook` ✓
9. `/guestbook/admin?key=correctkey` → shows all messages with delete buttons ✓
10. Delete a message → removed from feed instantly ✓
