"use client";
import Link from "next/link";
import { useCarrito } from "../lib/CarritoContext";
import Navbar from "../components/Navbar";

export default function Carrito() {
  const { carrito, quitarProducto, cambiarCantidad, totalPrecio, vaciarCarrito } =
    useCarrito();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <Navbar />

      <section className="px-8 py-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-8">
          Tu <span className="text-cyan-400">Carrito</span>
        </h2>

        {carrito.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-6">
              Tu carrito está vacío.
            </p>
            <Link href="/productos">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition">
                Ver productos
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mb-8">
              {carrito.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border border-cyan-900 rounded-xl p-4 bg-gray-950"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{item.nombre}</h3>
                    <p className="text-gray-400 text-sm">L. {item.precio} c/u</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                      className="bg-gray-800 hover:bg-gray-700 w-8 h-8 rounded-lg text-white"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{item.cantidad}</span>
                    <button
                      onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                      className="bg-gray-800 hover:bg-gray-700 w-8 h-8 rounded-lg text-white"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-28 text-right font-bold text-cyan-400">
                    L. {(item.precio * item.cantidad).toFixed(2)}
                  </div>

                  <button
                    onClick={() => quitarProducto(item.id)}
                    className="ml-4 text-red-400 hover:text-red-300 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-cyan-900 pt-6 flex items-center justify-between">
              <button
                onClick={vaciarCarrito}
                className="text-gray-500 hover:text-red-400 text-sm transition"
              >
                Vaciar carrito
              </button>

              <div className="text-right">
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-3xl font-extrabold text-cyan-400">
                  L. {totalPrecio.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition">
                Proceder al pago
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}