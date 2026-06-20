"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Carrusel from "./components/Carrusel";
import { supabase } from "./lib/supabase";
import { useCarrito } from "./lib/CarritoContext";
import { Laptop, Headphones, Smartphone } from "lucide-react";

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  destacado: boolean;
  imagen?: string;
};

export default function Home() {
  const [destacados, setDestacados] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const { agregarProducto } = useCarrito();
  const [notificacion, setNotificacion] = useState("");

  useEffect(() => {
    const obtenerDestacados = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("destacado", true)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error al cargar destacados:", error);
      } else {
        setDestacados(data);
      }
      setCargando(false);
    };

    obtenerDestacados();
  }, []);

  const handleAgregar = (producto: Producto) => {
    agregarProducto(producto);
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

      {/* HERO */}
      <Carrusel />

      {/* CATEGORÍAS */}
      <section className="px-8 py-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { Icon: Laptop, title: "Laptops", desc: "Para trabajo y estudio" },
          { Icon: Headphones, title: "Accesorios", desc: "Audio, periféricos y más" },
          { Icon: Smartphone, title: "Gadgets", desc: "Lo último en tecnología" },
        ].map((cat) => (
          <Link key={cat.title} href={`/productos?categoria=${encodeURIComponent(cat.title)}`}>
            <div className="border border-cyan-900 rounded-2xl p-6 text-center hover:border-cyan-400 transition cursor-pointer bg-gray-950">
              <div className="flex justify-center mb-3 text-cyan-400">
                <cat.Icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-white">{cat.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{cat.desc}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* DESTACADOS / MÁS VENDIDOS */}
      {!cargando && destacados.length > 0 && (
        <section className="px-8 py-16 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-cyan-400 text-sm tracking-widest uppercase mb-2">
              Selección especial
            </p>
            <h2 className="text-3xl font-extrabold">
              Más <span className="text-cyan-400">Vendidos</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destacados.map((producto) => (
              <div
                key={producto.id}
                className="relative border border-cyan-900 rounded-2xl p-5 bg-gray-950 hover:border-cyan-400 transition flex flex-col"
              >
                <span className="absolute top-3 right-3 bg-cyan-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  Destacado
                </span>
                <div className="bg-gray-900 rounded-xl h-32 flex items-center justify-center mb-4 overflow-hidden">
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <span className="text-4xl">📦</span>
                  )}
                </div>
                <span className="text-xs text-cyan-400 uppercase tracking-wide mb-1">
                  {producto.categoria}
                </span>
                <h3 className="text-base font-bold text-white mb-1">
                  {producto.nombre}
                </h3>
                <p className="text-gray-400 text-xs mb-3 flex-1">
                  {producto.descripcion}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold text-cyan-400">
                    L. {producto.precio}
                  </span>
                  <button
                    onClick={() => handleAgregar(producto)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-3 py-2 rounded-lg text-xs transition"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="text-center text-gray-600 text-sm py-8 border-t border-cyan-900">
        © 2025 TECLYSE — Aprende de IT conmigo
      </footer>
    </main>
  );
}