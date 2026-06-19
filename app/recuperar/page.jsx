"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Recuperar() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleRecuperar = async () => {
    setCargando(true);
    setMensaje("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://teclyse-store.vercel.app/nueva-contrasena",
    });
    if (error) {
      setMensaje("❌ Error: " + error.message);
    } else {
      setMensaje("✅ Revisa tu correo, te enviamos un link para restablecer tu contraseña.");
    }
    setCargando(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-cyan-900 rounded-2xl p-8 bg-gray-950">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-2">
          TECLYSE
        </h1>
        <p className="text-gray-400 text-center text-sm mb-8">
          Recupera tu contraseña
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-900 border border-cyan-900 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />

          {mensaje && (
            <p className="text-sm text-center text-cyan-300">{mensaje}</p>
          )}

          <button
            onClick={handleRecuperar}
            disabled={cargando}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition disabled:opacity-50"
          >
            {cargando ? "Enviando..." : "Enviar link de recuperación"}
          </button>

          <p className="text-center text-gray-500 text-sm">
            ¿Recordaste tu contraseña?{" "}
            <Link href="/login" className="text-cyan-400 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}