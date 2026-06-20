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

   const lineItemsConProducto = await Promise.all(
  session.line_items.data.map(async (item) => {
    const price = await stripe.prices.retrieve(item.price.id, {
      expand: ["product"],
    });
    return {
      nombre: item.description,
      cantidad: item.quantity,
      precio: item.amount_total / 100 / item.quantity,
      producto_id: price.product.metadata.producto_id,
    };
  })
);

return NextResponse.json({
  total: session.amount_total / 100,
  items: lineItemsConProducto,
});


  } catch (error) {
    console.error("Error verificando pago:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}