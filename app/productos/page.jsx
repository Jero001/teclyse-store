"use client";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "../lib/supabase";
import { useCarrito } from "../lib/CarritoContext";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Productos() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ProductosContenido />
    </Suspense>
  );
}

function ProductosContenido() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { agregarProducto } = useCarrito();
  const [notificacion, setNotificacion] = useState("");
  const searchParams = useSearchParams();
  const categoriaFiltro = searchParams.get("categoria");

  useEffect(() => {
    const obtenerProductos = async () => {
      let query = supabase.from("productos").select("*").order("id", { ascending: true });

      if (categoriaFiltro) {
        query = query.eq("categoria", categoriaFiltro);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error al cargar productos:", error);
      } else {
        setProductos(data);
      }
      setCargando(false);
    };

    obtenerProductos();
  }, [categoriaFiltro]);

 const handleAgregar = (producto) => {
    const productoFinal = producto.precio_oferta
      ? { ...producto, precio: producto.precio_oferta }
      : producto;
    agregarProducto(productoFinal);
    setNotificacion(`✅ ${producto.nombre} agregado al carrito`);
    setTimeout(() => setNotificacion(""), 2500);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {notificacion && (
        <div className="fixed top-20 right-6 bg-cyan-500 text-black font-semibold px-5 py-3 rounded-xl shadow-lg z-50 transition">
          {notificacion}
        </div>
      )}

      <Navbar />

      {/* TITULO */}
      <section className="px-8 py-12 text-center">
        <h2 className="text-4xl font-extrabold mb-2">
          {categoriaFiltro ? (
            <>
              <span className="text-cyan-400">{categoriaFiltro}</span>
            </>
          ) : (
            <>
              Nuestros <span className="text-cyan-400">Productos</span>
            </>
          )}
        </h2>
        <p className="text-gray-400">
          {categoriaFiltro
            ? `Mostrando productos de la categoría ${categoriaFiltro}`
            : "Tecnología de calidad, al mejor precio"}
        </p>
        {categoriaFiltro && (
          <a
            href="/productos"
            className="inline-block mt-3 text-cyan-400 hover:underline text-sm"
          >
            ← Ver todos los productos
          </a>
        )}
      </section>

      {/* GRID DE PRODUCTOS */}
      <section className="px-8 pb-20 max-w-6xl mx-auto">
        {cargando ? (
          <p className="text-center text-gray-400">Cargando productos...</p>
        ) : productos.length === 0 ? (
          <p className="text-center text-gray-400">
            {categoriaFiltro
              ? `No hay productos en la categoría "${categoriaFiltro}" todavía.`
              : "No hay productos disponibles todavía."}
          </p>
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
                  {producto.precio_oferta ? (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 line-through">
                        L. {producto.precio}
                      </span>
                      <span className="text-xl font-bold text-cyan-400">
                        L. {producto.precio_oferta}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-cyan-400">
                      L. {producto.precio}
                    </span>
                  )}
                  <button
                    onClick={() => handleAgregar(producto)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-2 rounded-lg text-sm transition"
                  >
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