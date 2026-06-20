import Navbar from "../components/Navbar";

export default function Contacto() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="px-8 py-16 max-w-3xl mx-auto text-center">
        <p className="text-cyan-400 text-sm tracking-widest uppercase mb-2">
          Hablemos
        </p>
        <h2 className="text-4xl font-extrabold mb-4">
          Contáctanos
        </h2>
        <p className="text-gray-400 mb-12">
          ¿Tienes dudas sobre nuestros productos o tu pedido? Escríbenos por
          cualquiera de estos medios.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {/* CORREO */}
          <a
            href="mailto:contacto@teclyse.com"
            className="border border-cyan-900 rounded-2xl p-6 hover:border-cyan-400 transition bg-gray-950 flex flex-col items-center gap-3"
          >
            <span className="text-3xl">✉️</span>
            <h3 className="font-bold text-white">Correo</h3>
            <p className="text-gray-400 text-sm">contacto@teclyse.com</p>
          </a>

          {/* INSTAGRAM */}
          <a
            href="https://instagram.com/teclyse"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-cyan-900 rounded-2xl p-6 hover:border-cyan-400 transition bg-gray-950 flex flex-col items-center gap-3"
          >
            <span className="text-3xl">📷</span>
            <h3 className="font-bold text-white">Instagram</h3>
            <p className="text-gray-400 text-sm">@teclyse</p>
          </a>

          {/* FACEBOOK */}
          <a
            href="https://facebook.com/teclyse"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-cyan-900 rounded-2xl p-6 hover:border-cyan-400 transition bg-gray-950 flex flex-col items-center gap-3"
          >
            <span className="text-3xl">📘</span>
            <h3 className="font-bold text-white">Facebook</h3>
            <p className="text-gray-400 text-sm">/teclyse</p>
          </a>
        </div>

        <div className="border-t border-cyan-900 pt-8">
          <p className="text-gray-500 text-sm">
            📍 Blvd Morazán, Tegucigalpa, Honduras
          </p>
          <p className="text-gray-500 text-sm">
            📍 Blvd Cuarto Centenario, Comayagua, Honduras
          </p>
          <p className="text-gray-500 text-sm mt-3">
            Horario de atención:
          </p>
          <p className="text-gray-500 text-sm">
            Lunes a Viernes, 9am - 6pm
          </p>
          <p className="text-gray-500 text-sm">
            Sábados, 9am - 1pm
          </p>
          <p className="text-gray-500 text-sm">
            Domingo cerrado
          </p>
        </div>
      </section>

      <footer className="text-center text-gray-600 text-sm py-8 border-t border-cyan-900">
        © 2026 TECLYSE — Tu mejor aliado en tecnología en Honduras
      </footer>
    </main>
  );
}