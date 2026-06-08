"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setCargando(true);
    setMensaje("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMensaje("❌ Correo o contraseña incorrectos.");
    } else {
      router.push("/");
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
          Inicia sesión en tu cuenta
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-900 border border-cyan-900 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-900 border border-cyan-900 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />

          {mensaje && (
            <p className="text-sm text-center text-red-400">{mensaje}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={cargando}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition disabled:opacity-50"
          >
            {cargando ? "Entrando..." : "Iniciar sesión"}
          </button>

          <p className="text-center text-gray-500 text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="text-cyan-400 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}