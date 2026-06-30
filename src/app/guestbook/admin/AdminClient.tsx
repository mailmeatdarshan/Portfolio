"use client";

import React, { useState } from "react";
import { GuestbookEntry } from "@/lib/guestbook";
import { deleteGuestbookEntryAction } from "../actions";
import { Trash2, AlertCircle, RefreshCw } from "lucide-react";

interface AdminClientProps {
  initialEntries: GuestbookEntry[];
  adminKey: string;
}

export default function AdminClient({ initialEntries, adminKey }: AdminClientProps) {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the message from "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    setError(null);

    try {
      const res = await deleteGuestbookEntryAction(id, adminKey);
      if (res.success) {
        setEntries((prev) => prev.filter((item) => item.id !== id));
      } else {
        setError(res.error || "Failed to delete message.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (timestamp: number) => {
    if (!mounted) return "";
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {entries.length === 0 ? (
        <div className="p-8 text-center text-neutral-500 bg-neutral-900/50 rounded-2xl border border-neutral-800">
          No entries found.
        </div>
      ) : (
        <div className="overflow-x-auto border border-neutral-800 rounded-2xl bg-neutral-900/20">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/40 text-neutral-400 font-mono text-xs uppercase">
                <th className="p-4">Sender</th>
                <th className="p-4">Message</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-neutral-800/60 hover:bg-neutral-900/10">
                  <td className="p-4 font-semibold">
                    <div>{entry.name}</div>
                    {entry.handle && (
                      <div className="text-xs text-neutral-500 font-mono mt-0.5">{entry.handle}</div>
                    )}
                  </td>
                  <td className="p-4 max-w-md break-words text-neutral-300">
                    {entry.message}
                  </td>
                  <td className="p-4 text-xs text-neutral-500 font-mono">
                    {formatDate(entry.createdAt)}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(entry.id, entry.name)}
                      disabled={deletingId !== null}
                      className="p-2 rounded-lg bg-red-950/20 hover:bg-red-900/30 text-red-400 border border-red-900/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                      title="Delete Entry"
                    >
                      {deletingId === entry.id ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
