"use client";
import { useState } from "react";
import Link from "next/link";
import { useCarrito } from "../lib/CarritoContext";
import { useUsuario } from "../lib/UsuarioContext";
import { ShoppingCart, User, LogOut, Package, ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const { totalItems } = useCarrito();
  const { usuario, cargandoUsuario, cerrarSesion } = useUsuario();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="border-b border-cyan-900 px-4 sm:px-8 py-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl sm:text-2xl font-bold tracking-widest text-cyan-400">
            TECLYSE
          </h1>
        </Link>

        {/* LINKS - Solo desktop */}
        <div className="hidden md:flex gap-6 text-sm text-gray-300">
          <Link href="/" className="hover:text-cyan-400 transition">Inicio</Link>
          <Link href="/productos" className="hover:text-cyan-400 transition">Productos</Link>
          <Link href="/contacto" className="hover:text-cyan-400 transition">Contacto</Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* USUARIO - Solo desktop */}
          <div className="hidden md:block">
            {!cargandoUsuario && (
              usuario ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition text-sm py-2">
                    <User size={16} />
                    {usuario.user_metadata?.nombre || usuario.email}
                    <ChevronDown size={14} />
                  </button>

                  <div className="absolute right-0 top-full hidden group-hover:block bg-gray-950 border border-cyan-900 rounded-xl py-2 min-w-[180px] z-50">
                    <Link
                      href="/mis-pedidos"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-gray-900 transition"
                    >
                      <Package size={16} /> Ver mis pedidos
                    </Link>
                    <button
                      onClick={cerrarSesion}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-900 transition"
                    >
                      <LogOut size={16} /> Cerrar sesión
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
          </div>

          {/* CARRITO - siempre visible */}
          <Link href="/carrito">
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-3 sm:px-4 py-2 rounded-lg text-sm transition relative flex items-center gap-2">
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>

          {/* BOTÓN HAMBURGUESA - solo móvil */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden text-gray-300 hover:text-cyan-400 transition"
          >
            {menuAbierto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {menuAbierto && (
        <div className="md:hidden mt-4 flex flex-col gap-1 border-t border-cyan-900 pt-4">
          <Link
            href="/"
            onClick={() => setMenuAbierto(false)}
            className="px-2 py-3 text-gray-300 hover:text-cyan-400 transition"
          >
            Inicio
          </Link>
          <Link
            href="/productos"
            onClick={() => setMenuAbierto(false)}
            className="px-2 py-3 text-gray-300 hover:text-cyan-400 transition"
          >
            Productos
          </Link>
          <Link
            href="/contacto"
            onClick={() => setMenuAbierto(false)}
            className="px-2 py-3 text-gray-300 hover:text-cyan-400 transition"
          >
            Contacto
          </Link>

          <div className="border-t border-gray-800 my-2" />

          {!cargandoUsuario && (
            usuario ? (
              <>
                <Link
                  href="/mis-pedidos"
                  onClick={() => setMenuAbierto(false)}
                  className="flex items-center gap-2 px-2 py-3 text-gray-300 hover:text-cyan-400 transition"
                >
                  <Package size={16} /> Mis pedidos
                </Link>
                <button
                  onClick={() => {
                    cerrarSesion();
                    setMenuAbierto(false);
                  }}
                  className="flex items-center gap-2 px-2 py-3 text-red-400 hover:text-red-300 transition text-left"
                >
                  <LogOut size={16} /> Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuAbierto(false)}
                  className="px-2 py-3 text-gray-300 hover:text-cyan-400 transition"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/registro"
                  onClick={() => setMenuAbierto(false)}
                  className="px-2 py-3 text-cyan-400"
                >
                  Registrarse
                </Link>
              </>
            )
          )}
        </div>
      )}
    </nav>
  );
}