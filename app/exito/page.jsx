"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useCarrito } from "../lib/CarritoContext";
import Navbar from "../components/Navbar";

export default function Exito() {
  const { vaciarCarrito } = useCarrito();

  useEffect(() => {
    vaciarCarrito();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 gap-6">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-4xl font-extrabold">
          ¡Compra <span className="text-cyan-400">exitosa</span>!
        </h2>
        <p className="text-gray-400 max-w-md">
          Gracias por tu compra en TECLYSE. Te enviaremos los detalles de tu pedido pronto.
        </p>
        <Link href="/productos">
          <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl text-lg transition">
            Seguir comprando
          </button>
        </Link>
      </section>
    </main>
  );
}