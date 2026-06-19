import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { carrito } = await request.json();

    const line_items = carrito.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.nombre,
        },
        unit_amount: Math.round(item.precio * 100),
      },
      quantity: item.cantidad,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/exito`,
      cancel_url: `${request.headers.get("origin")}/carrito`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error de Stripe:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}