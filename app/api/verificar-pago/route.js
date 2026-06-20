import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Pago no confirmado" }, { status: 400 });
    }

    return NextResponse.json({
      total: session.amount_total / 100,
      items: session.line_items.data.map((item) => ({
        nombre: item.description,
        cantidad: item.quantity,
        precio: item.amount_total / 100 / item.quantity,
      })),
    });
  } catch (error) {
    console.error("Error verificando pago:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}