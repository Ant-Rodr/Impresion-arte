"use client";

import { useEffect, useState } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminContactosPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  useEffect(() => {
    fetch("/api/admin/contacts")
      .then((r) => r.json())
      .then((data) => { setContacts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const markRead = async (contact: Contact) => {
    setSelected(contact);
    if (!contact.read) {
      await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: contact.id, read: true }),
      });
      setContacts((prev) => prev.map((c) => (c.id === contact.id ? { ...c, read: true } : c)));
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-24 text-gray-400">Cargando...</div>;
  }

  const unread = contacts.filter((c) => !c.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black mb-1">Mensajes de contacto</h1>
        <p className="text-gray-500 text-sm">
          {contacts.length} mensajes · <span className="text-red-500 font-semibold">{unread} sin leer</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista */}
        <div className="lg:col-span-1 bg-white dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
          {contacts.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">No hay mensajes</div>
          ) : (
            <div className="divide-y divide-light-border dark:divide-dark-border">
              {contacts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => markRead(c)}
                  className={`w-full text-left px-4 py-4 hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors ${
                    selected?.id === c.id ? "bg-primary/5 border-l-2 border-primary" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm font-semibold truncate ${!c.read ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
                      {c.name}
                    </p>
                    {!c.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{c.subject}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(c.createdAt).toLocaleDateString("es-ES")}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detalle */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border p-6">
          {!selected ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm py-12">
              Selecciona un mensaje para leerlo
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{selected.subject}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {selected.name} · <a href={`mailto:${selected.email}`} className="text-primary hover:underline">{selected.email}</a>
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(selected.createdAt).toLocaleString("es-ES")}
                </span>
              </div>
              <hr className="border-light-border dark:border-dark-border" />
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {selected.message}
              </p>
              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                className="btn-primary text-sm !py-2.5 !px-5 inline-flex"
              >
                Responder por email
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
