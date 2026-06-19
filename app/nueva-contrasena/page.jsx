"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function NuevaContrasena() {
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  const handleActualizar = async () => {
    if (password !== confirmar) {
      setMensaje("❌ Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);
    setMensaje("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMensaje("❌ Error: " + error.message);
    } else {
      setMensaje("✅ Contraseña actualizada. Redirigiendo...");
      setTimeout(() => router.push("/login"), 2000);
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
          Crea tu nueva contraseña
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-900 border border-cyan-900 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />
          <input
            type="password"
            placeholder="Confirma tu contraseña"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            className="bg-gray-900 border border-cyan-900 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />

          {mensaje && (
            <p className="text-sm text-center text-cyan-300">{mensaje}</p>
          )}

          <button
            onClick={handleActualizar}
            disabled={cargando}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition disabled:opacity-50"
          >
            {cargando ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </div>
      </div>
    </main>
  );
}