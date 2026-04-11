"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Tab = "login" | "register";

export default function CuentaLoginPage() {
  const [tab, setTab] = useState<Tab>("login");
  const router = useRouter();

  // Login state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [regForm, setRegForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    const result = await signIn("credentials", {
      email: loginForm.email,
      password: loginForm.password,
      redirect: false,
    });
    setLoginLoading(false);
    if (result?.error) {
      setLoginError("Email o contraseña incorrectos");
    } else {
      router.push("/cuenta");
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError("");
    if (regForm.password !== regForm.confirm) {
      setRegError("Las contraseñas no coinciden");
      return;
    }
    setRegLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: regForm.name, email: regForm.email, password: regForm.password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setRegError(data.error ?? "Error al crear la cuenta");
      setRegLoading(false);
      return;
    }
    // Auto-login after register
    const result = await signIn("credentials", {
      email: regForm.email,
      password: regForm.password,
      redirect: false,
    });
    setRegLoading(false);
    if (result?.error) {
      setRegSuccess(true); // cuenta creada, redirige al login
      setTab("login");
    } else {
      router.push("/cuenta");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-4 py-24">
      <div className="w-full max-w-md">
        {/* Logo / header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
            <span className="text-lg font-bold">Impresion<span className="text-primary">-</span>arte</span>
          </Link>
          <h1 className="text-2xl font-black">
            {tab === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {tab === "login" ? "Accede a tus pedidos y más" : "Gestiona tus pedidos fácilmente"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl border border-light-border dark:border-dark-border overflow-hidden mb-6">
          {([["login", "Iniciar sesión"], ["register", "Crear cuenta"]] as [Tab, string][]).map(([t, label]) => (
            <button
              key={t}
              onClick={() => { setTab(t); setLoginError(""); setRegError(""); }}
              className={`flex-1 py-2.5 text-sm font-semibold transition-all ${
                tab === t
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {regSuccess && (
          <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-700 dark:text-green-400 mb-4">
            Cuenta creada correctamente. Inicia sesión ahora.
          </div>
        )}

        {/* Login form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="card p-6 space-y-4">
            {loginError && (
              <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold mb-1.5">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
                autoComplete="email"
                placeholder="tu@email.com"
                className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Contraseña</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loginLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </span>
              ) : "Iniciar sesión"}
            </button>
          </form>
        )}

        {/* Register form */}
        {tab === "register" && (
          <form onSubmit={handleRegister} className="card p-6 space-y-4">
            {regError && (
              <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {regError}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold mb-1.5">Nombre</label>
              <input
                type="text"
                value={regForm.name}
                onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                required
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Email</label>
              <input
                type="email"
                value={regForm.email}
                onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                required
                placeholder="tu@email.com"
                className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Contraseña</label>
              <input
                type="password"
                value={regForm.password}
                onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Confirmar contraseña</label>
              <input
                type="password"
                value={regForm.confirm}
                onChange={(e) => setRegForm({ ...regForm, confirm: e.target.value })}
                required
                placeholder="Repite la contraseña"
                className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={regLoading}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {regLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creando cuenta...
                </span>
              ) : "Crear cuenta"}
            </button>
            <p className="text-xs text-center text-gray-400">
              Al registrarte aceptas nuestros{" "}
              <Link href="/terminos" className="text-primary hover:underline">Términos</Link>
              {" "}y{" "}
              <Link href="/privacidad" className="text-primary hover:underline">Política de privacidad</Link>.
            </p>
          </form>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          <Link href="/" className="hover:text-primary transition-colors">← Volver a la tienda</Link>
        </p>
      </div>
    </div>
  );
}
