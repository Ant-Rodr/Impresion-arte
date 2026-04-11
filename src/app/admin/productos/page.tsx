"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  material: string;
  category: string;
  tags: string;
  imageUrl?: string;
  inStock: boolean;
  createdAt: string;
}

const CATEGORIES = [
  { value: "gamer", label: "Setup Gamer y Gadgets" },
  { value: "mesa-rol", label: "Juegos de Mesa y Rol" },
  { value: "decorativos", label: "Decoración Moderna" },
  { value: "cosplay", label: "Cosplay / Props" },
];

const MATERIALS = ["PLA Estándar", "PLA Silk", "PETG", "Resina", "TPU", "ASA", "ABS"];

const CATEGORY_COLORS: Record<string, string> = {
  gamer: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "mesa-rol": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  decorativos: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  cosplay: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
};

const EMPTY_FORM = {
  name: "",
  slug: "",
  description: "",
  price: "",
  material: "PLA Estándar",
  category: "gamer",
  tags: "",
  imageUrl: "",
  inStock: true,
};

export default function AdminProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    if (res.ok) setProducts(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchProducts(); }, []);

  function openNew() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setError("");
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: String(p.price),
      material: p.material,
      category: p.category,
      tags: p.tags,
      imageUrl: p.imageUrl ?? "",
      inStock: p.inStock,
    });
    setError("");
    setShowForm(true);
  }

  function autoSlug(name: string) {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function handleNameChange(name: string) {
    setForm((f) => ({ ...f, name, slug: editing ? f.slug : autoSlug(name) }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload-image", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (res.ok) {
      setForm((f) => ({ ...f, imageUrl: data.url }));
    } else {
      setError(data.error ?? "Error al subir imagen");
    }
    // Reset input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      price: parseFloat(form.price),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    const res = await fetch("/api/admin/products", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...payload, id: editing.id } : payload),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Error al guardar");
    } else {
      setShowForm(false);
      fetchProducts();
    }
    setSaving(false);
  }

  async function toggleStock(p: Product) {
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id, inStock: !p.inStock }),
    });
    fetchProducts();
  }

  async function confirmDelete() {
    if (!deleteId) return;
    await fetch(`/api/admin/products?id=${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    fetchProducts();
  }

  const filtered = products.filter((p) => {
    const matchCat = filterCat === "all" || p.category === filterCat;
    const matchSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black">Productos</h1>
          <p className="text-sm text-gray-500 mt-1">{products.length} productos en la base de datos</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm !py-2 gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nuevo producto
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 text-sm rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="px-4 py-2 text-sm rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card focus:outline-none focus:border-primary"
        >
          <option value="all">Todas las categorías</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">Cargando productos...</div>
      ) : filtered.length === 0 ? (
        <div className="card p-16 text-center">
          <p className="text-gray-500 mb-2 font-semibold">
            {products.length === 0 ? "No hay productos todavía" : "Sin resultados para esta búsqueda"}
          </p>
          {products.length === 0 && (
            <p className="text-sm text-gray-400 mb-4">Crea tu primer producto con el botón &ldquo;Nuevo producto&rdquo;</p>
          )}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-dark-bg border-b border-light-border dark:border-dark-border">
                <tr>
                  {["Nombre", "Categoría", "Material", "Precio", "Stock", "Acciones"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border dark:divide-dark-border">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 flex items-center justify-center">
                          {p.imageUrl ? (
                            <Image src={p.imageUrl} alt={p.name} width={40} height={40} className="object-cover w-full h-full" />
                          ) : (
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{p.name}</p>
                          <p className="text-xs text-gray-400 font-mono">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${CATEGORY_COLORS[p.category] ?? "bg-gray-100 text-gray-600"}`}>
                        {CATEGORIES.find((c) => c.value === p.category)?.label ?? p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{p.material}</td>
                    <td className="px-4 py-3 font-bold text-primary">{p.price.toFixed(2).replace(".", ",")}€</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleStock(p)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${p.inStock ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}
                        title={p.inStock ? "Disponible — click para desactivar" : "Sin stock — click para activar"}
                      >
                        <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transform transition-transform ${p.inStock ? "translate-x-4" : "translate-x-1"}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Editar"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Eliminar"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-light-card dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-light-border dark:border-dark-border sticky top-0 bg-light-card dark:bg-dark-card z-10">
              <h2 className="text-lg font-bold">{editing ? "Editar producto" : "Nuevo producto"}</h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2">{error}</p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Nombre *</label>
                  <input
                    value={form.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    required
                    placeholder="Soporte Doble Mando"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Slug (URL) *</label>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                    required
                    placeholder="soporte-doble-mando"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-mono"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Descripción *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    required
                    rows={3}
                    placeholder="Describe el producto..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Precio (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    required
                    placeholder="12.90"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Material *</label>
                  <select
                    value={form.material}
                    onChange={(e) => setForm((f) => ({ ...f, material: e.target.value }))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:border-primary"
                  >
                    {MATERIALS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Categoría *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:border-primary"
                  >
                    {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Etiquetas <span className="normal-case font-normal text-gray-400">(separadas por comas)</span>
                  </label>
                  <input
                    value={form.tags}
                    onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                    placeholder="Gaming, Organización, Escritorio"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Imagen del producto</label>
                  {/* Preview */}
                  {form.imageUrl && (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mb-2 border border-light-border dark:border-dark-border bg-gray-50 dark:bg-gray-900">
                      <Image src={form.imageUrl} alt="Preview" fill className="object-contain" />
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, imageUrl: "" }))}
                        className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  {/* Upload button */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm rounded-xl border-2 border-dashed border-light-border dark:border-dark-border hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        Subiendo...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        {form.imageUrl ? "Cambiar imagen" : "Subir imagen (JPG, PNG, WebP · máx 5 MB)"}
                      </>
                    )}
                  </button>
                  {/* Optional manual URL fallback */}
                  <input
                    value={form.imageUrl}
                    onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                    placeholder="O pega una URL externa..."
                    className="w-full mt-2 px-3 py-2 text-xs rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-500"
                  />
                </div>

                <div className="col-span-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, inStock: !f.inStock }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.inStock ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}
                  >
                    <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform ${form.inStock ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                  <span className="text-sm font-medium">{form.inStock ? "Disponible" : "Sin stock"}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border border-light-border dark:border-dark-border hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 btn-primary text-sm !py-2.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {saving ? "Guardando..." : editing ? "Guardar cambios" : "Crear producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-light-card dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">¿Eliminar producto?</h3>
            <p className="text-sm text-gray-500 mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 text-sm font-semibold rounded-xl border border-light-border dark:border-dark-border hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
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
