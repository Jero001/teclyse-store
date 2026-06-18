"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error al cargar productos:", error);
      } else {
        setProductos(data);
      }
      setCargando(false);
    };

    obtenerProductos();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-cyan-900">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-widest text-cyan-400">
            TECLYSE
          </h1>
        </Link>
        <div className="flex gap-6 text-sm text-gray-300">
          <Link href="/" className="hover:text-cyan-400 transition">Inicio</Link>
          <Link href="/productos" className="text-cyan-400">Productos</Link>
          <Link href="/contacto" className="hover:text-cyan-400 transition">Contacto</Link>
        </div>
        <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-2 rounded-lg text-sm transition">
          🛒 Carrito
        </button>
      </nav>

      {/* TITULO */}
      <section className="px-8 py-12 text-center">
        <h2 className="text-4xl font-extrabold mb-2">
          Nuestros <span className="text-cyan-400">Productos</span>
        </h2>
        <p className="text-gray-400">Tecnología de calidad, al mejor precio</p>
      </section>

      {/* GRID DE PRODUCTOS */}
      <section className="px-8 pb-20 max-w-6xl mx-auto">
        {cargando ? (
          <p className="text-center text-gray-400">Cargando productos...</p>
        ) : productos.length === 0 ? (
          <p className="text-center text-gray-400">No hay productos disponibles todavía.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="border border-cyan-900 rounded-2xl p-5 bg-gray-950 hover:border-cyan-400 transition flex flex-col"
              >
                <div className="bg-gray-900 rounded-xl h-40 flex items-center justify-center mb-4 text-4xl">
                  📦
                </div>
                <span className="text-xs text-cyan-400 uppercase tracking-wide mb-1">
                  {producto.categoria}
                </span>
                <h3 className="text-lg font-bold text-white mb-1">
                  {producto.nombre}
                </h3>
                <p className="text-gray-400 text-sm mb-3 flex-1">
                  {producto.descripcion}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-cyan-400">
                    L. {producto.precio}
                  </span>
                  <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-2 rounded-lg text-sm transition">
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}