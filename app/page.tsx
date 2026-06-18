import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-cyan-900">
        <h1 className="text-2xl font-bold tracking-widest text-cyan-400">
          TECLYSE
        </h1>
        <div className="flex gap-6 text-sm text-gray-300">
          <Link href="/" className="hover:text-cyan-400 transition">Inicio</Link>
          <Link href="/productos" className="hover:text-cyan-400 transition">Productos</Link>
          <Link href="/contacto" className="hover:text-cyan-400 transition">Contacto</Link>
        </div>
        <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-2 rounded-lg text-sm transition">
          🛒 Carrito
        </button>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 gap-6">
        <p className="text-cyan-400 text-sm tracking-widest uppercase">
          Tecnología al alcance de todos
        </p>
        <h2 className="text-5xl font-extrabold leading-tight max-w-3xl">
          Los mejores <span className="text-cyan-400">electrónicos</span> en un solo lugar
        </h2>
        <p className="text-gray-400 max-w-xl text-lg">
          Encuentra laptops, accesorios, gadgets y más. Envío rápido, precios justos y garantía en cada compra.
        </p>
        <div className="flex gap-4 mt-4">
          <Link href="/productos">
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl text-lg transition">
              Ver productos
            </button>
          </Link>
          <Link href="/contacto">
            <button className="border border-cyan-700 hover:border-cyan-400 text-cyan-400 px-8 py-3 rounded-xl text-lg transition">
              Contáctanos
            </button>
          </Link>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="px-8 py-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { icon: "💻", title: "Laptops", desc: "Para trabajo y estudio" },
          { icon: "🎧", title: "Accesorios", desc: "Audio, periféricos y más" },
          { icon: "📱", title: "Gadgets", desc: "Lo último en tecnología" },
        ].map((cat) => (
          <div
            key={cat.title}
            className="border border-cyan-900 rounded-2xl p-6 text-center hover:border-cyan-400 transition cursor-pointer bg-gray-950"
          >
            <div className="text-4xl mb-3">{cat.icon}</div>
            <h3 className="text-lg font-bold text-white">{cat.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{cat.desc}</p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-600 text-sm py-8 border-t border-cyan-900">
        © 2025 TECLYSE — Aprende de IT conmigo
      </footer>
    </main>
  );
};