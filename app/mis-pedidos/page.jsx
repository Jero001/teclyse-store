"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { useUsuario } from "../lib/UsuarioContext";
import Navbar from "../components/Navbar";

export default function MisPedidos() {
  const { usuario, cargandoUsuario } = useUsuario();
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerOrdenes = async () => {
      if (!usuario) {
        setCargando(false);
        return;
      }

      const { data, error } = await supabase
        .from("ordenes")
        .select("*")
        .eq("usuario_id", usuario.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error al cargar pedidos:", error);
      } else {
        setOrdenes(data);
      }
      setCargando(false);
    };

    if (!cargandoUsuario) {
      obtenerOrdenes();
    }
  }, [usuario, cargandoUsuario]);

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-HN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const colorEstado = (estado) => {
    switch (estado) {
      case "pagado":
        return "bg-cyan-500 text-black";
      case "enviado":
        return "bg-green-500 text-black";
      case "cancelado":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-700 text-white";
    }
  };

  if (!cargandoUsuario && !usuario) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="flex flex-col items-center justify-center text-center px-6 py-32 gap-6">
          <p className="text-gray-400 text-lg">
            Debes iniciar sesión para ver tus pedidos.
          </p>
          <Link href="/login">
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition">
              Iniciar sesión
            </button>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="px-8 py-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-8">
          Mis <span className="text-cyan-400">Pedidos</span>
        </h2>

        {cargando ? (
          <p className="text-center text-gray-400">Cargando pedidos...</p>
        ) : ordenes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-6">
              Aún no tienes pedidos realizados.
            </p>
            <Link href="/productos">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition">
                Ir a comprar
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {ordenes.map((orden) => (
              <div
                key={orden.id}
                className="border border-cyan-900 rounded-2xl p-5 bg-gray-950"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-400">
                      Pedido #{orden.id}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatearFecha(orden.created_at)}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${colorEstado(
                      orden.estado
                    )}`}
                  >
                    {orden.estado.toUpperCase()}
                  </span>
                </div>

                <div className="border-t border-gray-800 pt-3 flex flex-col gap-1">
                  {orden.productos.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm text-gray-300"
                    >
                      <span>
                        {item.cantidad}x {item.nombre}
                      </span>
                      <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-800 mt-3 pt-3 flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total</span>
                  <span className="text-xl font-bold text-cyan-400">
                    ${orden.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}