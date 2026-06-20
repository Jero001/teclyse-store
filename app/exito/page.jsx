"use client";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCarrito } from "../lib/CarritoContext";
import { useUsuario } from "../lib/UsuarioContext";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";

export default function Exito() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ExitoContenido />
    </Suspense>
  );
}

function ExitoContenido() {
  const { vaciarCarrito } = useCarrito();
  const { usuario, cargandoUsuario } = useUsuario();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [estado, setEstado] = useState("procesando"); // procesando | listo | error

  useEffect(() => {
    if (cargandoUsuario) return; // espera a que el usuario termine de cargar

    const procesarOrden = async () => {
      if (!sessionId || !usuario) {
        setEstado("error");
        return;
      }

      try {
        // 1. Verificar el pago con Stripe
        const res = await fetch("/api/verificar-pago", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (data.error) {
          setEstado("error");
          return;
        }

        // 2. Guardar la orden en Supabase
        const { error } = await supabase.from("ordenes").insert({
          usuario_id: usuario.id,
          productos: data.items,
          total: data.total,
          estado: "pagado",
          stripe_session_id: sessionId,
        });

        if (error) {
          console.error("Error guardando orden:", error);
        }

        // 3. Descontar el stock de cada producto comprado
        for (const item of data.items) {
          if (item.producto_id) {
            const { data: productoActual } = await supabase
              .from("productos")
              .select("stock")
              .eq("id", item.producto_id)
              .single();

            if (productoActual) {
              const nuevoStock = Math.max(
                0,
                productoActual.stock - item.cantidad
              );
              await supabase
                .from("productos")
                .update({ stock: nuevoStock })
                .eq("id", item.producto_id);
            }
          }
        }

        // 4. Vaciar el carrito
        vaciarCarrito();
        setEstado("listo");
      } catch (error) {
        console.error("Error procesando orden:", error);
        setEstado("error");
      }
    };

    procesarOrden();
  }, [sessionId, usuario, cargandoUsuario]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 gap-6">
        {estado === "procesando" && (
          <>
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-3xl font-extrabold">Procesando tu pedido...</h2>
          </>
        )}

        {estado === "listo" && (
          <>
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-4xl font-extrabold">
              ¡Compra <span className="text-cyan-400">exitosa</span>!
            </h2>
            <p className="text-gray-400 max-w-md">
              Gracias por tu compra en TECLYSE. Puedes ver el detalle en tus pedidos.
            </p>
            <div className="flex gap-4">
              <Link href="/productos">
                <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl text-lg transition">
                  Seguir comprando
                </button>
              </Link>
              <Link href="/mis-pedidos">
                <button className="border border-cyan-700 hover:border-cyan-400 text-cyan-400 px-8 py-3 rounded-xl text-lg transition">
                  Ver mis pedidos
                </button>
              </Link>
            </div>
          </>
        )}

        {estado === "error" && (
          <>
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-3xl font-extrabold">Algo salió mal</h2>
            <p className="text-gray-400 max-w-md">
              No pudimos confirmar tu pedido. Si el cobro se realizó, contáctanos.
            </p>
            <Link href="/productos">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl text-lg transition">
                Volver a la tienda
              </button>
            </Link>
          </>
        )}
      </section>
    </main>
  );
}