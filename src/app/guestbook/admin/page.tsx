import { redirect } from "next/navigation";
import { getEntries } from "@/lib/guestbook";
import AdminClient from "./AdminClient";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const key = typeof params.key === "string" ? params.key : "";
  const adminSecret = process.env.ADMIN_SECRET_KEY;

  console.log("Guestbook Admin Key Validation:", {
    receivedKey: key,
    envSecretExists: !!adminSecret,
    matches: key === adminSecret
  });

  if (!adminSecret || key !== adminSecret) {
    redirect("/guestbook");
  }

  // Fetch up to 200 entries to manage
  const entries = await getEntries(200);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Guestbook Admin Control</h1>
            <p className="text-xs text-neutral-500 mt-1 font-mono">
              [ SECURED SESSION ]
            </p>
          </div>
          <a 
            href="/guestbook" 
            className="text-xs px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 font-semibold tracking-wide"
          >
            Exit Admin
          </a>
        </div>

        <AdminClient initialEntries={entries} adminKey={key} />
      </div>
    </div>
  );
}
