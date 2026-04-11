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
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/contacts")
      .then((r) => r.json())
      .then((data) => { setContacts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const deleteContact = async () => {
    if (!deleteId) return;
    await fetch(`/api/admin/contacts?id=${deleteId}`, { method: "DELETE" });
    setContacts((prev) => prev.filter((c) => c.id !== deleteId));
    if (selected?.id === deleteId) setSelected(null);
    setDeleteId(null);
  };

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
                <div
                  key={c.id}
                  className={`flex items-stretch group ${selected?.id === c.id ? "bg-primary/5 border-l-2 border-primary" : ""}`}
                >
                  <button
                    onClick={() => markRead(c)}
                    className="flex-1 text-left px-4 py-4 hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors min-w-0"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className={`text-sm font-semibold truncate ${!c.read ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
                        {c.name}
                      </p>
                      {!c.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 ml-1" />}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{c.subject}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(c.createdAt).toLocaleDateString("es-ES")}
                    </p>
                  </button>
                  <button
                    onClick={() => setDeleteId(c.id)}
                    className="px-3 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
                    title="Eliminar"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
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
              <div className="flex gap-3">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="btn-primary text-sm !py-2.5 !px-5 inline-flex"
                >
                  Responder por email
                </a>
                <button
                  onClick={() => setDeleteId(selected.id)}
                  className="px-4 py-2.5 text-sm font-semibold rounded-xl border border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modal confirmar eliminación */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">¿Eliminar mensaje?</h3>
            <p className="text-sm text-gray-500 mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 text-sm font-semibold rounded-xl border border-light-border dark:border-dark-border hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={deleteContact}
                className="flex-1 px-4 py-2 text-sm font-semibold rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
