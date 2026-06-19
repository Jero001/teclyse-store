"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useCarrito } from "../lib/CarritoContext";
import Navbar from "../components/Navbar";

export default function Ofertas() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { agregarProducto } = useCarrito();
  const [notificacion, setNotificacion] = useState("");

  useEffect(() => {
    const obtenerOfertas = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .not("precio_oferta", "is", null)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error al cargar ofertas:", error);
      } else {
        setProductos(data);
      }
      setCargando(false);
    };

    obtenerOfertas();
  }, []);

  const handleAgregar = (producto) => {
    const productoConPrecioFinal = {
      ...producto,
      precio: producto.precio_oferta,
    };
    agregarProducto(productoConPrecioFinal);
    setNotificacion(`✅ ${producto.nombre} agregado al carrito`);
    setTimeout(() => setNotificacion(""), 2500);
  };

  const calcularDescuento = (precio, precioOferta) => {
    return Math.round(((precio - precioOferta) / precio) * 100);
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
        <p className="text-cyan-400 text-sm tracking-widest uppercase mb-2">
          Por tiempo limitado
        </p>
        <h2 className="text-4xl font-extrabold mb-2">
          🔥 <span className="text-cyan-400">Ofertas</span> especiales
        </h2>
        <p className="text-gray-400">Los mejores descuentos en tecnología</p>
      </section>

      {/* GRID DE OFERTAS */}
      <section className="px-8 pb-20 max-w-6xl mx-auto">
        {cargando ? (
          <p className="text-center text-gray-400">Cargando ofertas...</p>
        ) : productos.length === 0 ? (
          <p className="text-center text-gray-400">
            No hay ofertas disponibles en este momento. ¡Vuelve pronto!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="relative border border-cyan-900 rounded-2xl p-5 bg-gray-950 hover:border-cyan-400 transition flex flex-col"
              >
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{calcularDescuento(producto.precio, producto.precio_oferta)}%
                </span>
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
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 line-through">
                      L. {producto.precio}
                    </span>
                    <span className="text-xl font-bold text-cyan-400">
                      L. {producto.precio_oferta}
                    </span>
                  </div>
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