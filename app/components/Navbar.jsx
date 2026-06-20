"use client";
import Link from "next/link";
import { useCarrito } from "../lib/CarritoContext";
import { useUsuario } from "../lib/UsuarioContext";

export default function Navbar() {
  const { totalItems } = useCarrito();
  const { usuario, cargandoUsuario, cerrarSesion } = useUsuario();

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-cyan-900">
      <Link href="/">
        <h1 className="text-2xl font-bold tracking-widest text-cyan-400">
          TECLYSE
        </h1>
      </Link>

      <div className="flex gap-6 text-sm text-gray-300">
        <Link href="/" className="hover:text-cyan-400 transition">Inicio</Link>
        <Link href="/productos" className="hover:text-cyan-400 transition">Productos</Link>
        <Link href="/contacto" className="hover:text-cyan-400 transition">Contacto</Link>
      </div>

      <div className="flex items-center gap-4">
        {/* SECCIÓN USUARIO */}
        {!cargandoUsuario && (
          usuario ? (
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-300 hover:text-cyan-400 transition text-sm py-2">
                👤 {usuario.user_metadata?.nombre || usuario.email}
                <span className="text-xs">▾</span>
              </button>

              <div className="absolute right-0 top-full hidden group-hover:block bg-gray-950 border border-cyan-900 rounded-xl py-2 min-w-[180px] z-50">
                <Link
                  href="/mis-pedidos"
                  className="block px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-gray-900 transition"
                >
                  📦 Ver mis pedidos
                </Link>
                <button
                  onClick={cerrarSesion}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-900 transition"
                >
                  🚪 Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-sm">
              <Link href="/login" className="text-gray-300 hover:text-cyan-400 transition">
                Iniciar sesión
              </Link>
              <Link href="/registro">
                <button className="border border-cyan-700 hover:border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg transition">
                  Registrarse
                </button>
              </Link>
            </div>
          )
        )}

        {/* CARRITO */}
        <Link href="/carrito">
          <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-2 rounded-lg text-sm transition relative">
            🛒 Carrito
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
}