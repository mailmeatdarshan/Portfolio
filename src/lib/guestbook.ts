import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  deleteDoc, 
  doc, 
  onSnapshot,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db } from "./firebase";

export interface GuestbookEntry {
  id: string;
  name: string;
  handle?: string;
  message: string;
  createdAt: number; // millisecond timestamp
}

const COLLECTION_NAME = "guestbook";

export async function addEntry(name: string, handle: string, message: string) {
  const cleanName = name.trim().slice(0, 50);
  const cleanHandle = handle.trim().replace(/^@/, "").slice(0, 30);
  const cleanMessage = message.trim().slice(0, 280);

  if (!cleanName || !cleanMessage) {
    throw new Error("Name and message are required.");
  }

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    name: cleanName,
    handle: cleanHandle ? `@${cleanHandle}` : "",
    message: cleanMessage,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getEntries(limitCount = 100): Promise<GuestbookEntry[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const entries: GuestbookEntry[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt instanceof Timestamp 
        ? data.createdAt.toMillis() 
        : (typeof data.createdAt === "number" ? data.createdAt : Date.now());
        
      entries.push({
        id: doc.id,
        name: data.name || "Anonymous",
        handle: data.handle || "",
        message: data.message || "",
        createdAt,
      });
    });
    
    return entries;
  } catch (error) {
    console.error("Error getting entries:", error);
    return [];
  }
}

export async function deleteEntry(id: string) {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

export function subscribeToEntries(callback: (entries: GuestbookEntry[]) => void) {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (querySnapshot) => {
    const entries: GuestbookEntry[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt instanceof Timestamp 
        ? data.createdAt.toMillis() 
        : (typeof data.createdAt === "number" ? data.createdAt : Date.now());

      entries.push({
        id: doc.id,
        name: data.name || "Anonymous",
        handle: data.handle || "",
        message: data.message || "",
        createdAt,
      });
    });
    callback(entries);
  });
}
