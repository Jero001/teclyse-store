"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    imagen: "/banners/banner1.jpg",
    titulo: "Tecnología al alcance de todos",
    subtitulo: "Los mejores electrónicos en un solo lugar",
    boton: "Ver productos",
    link: "/productos",
  },
  {
    imagen: "/banners/banner2.jpg",
    titulo: "Ofertas especiales",
    subtitulo: "Aprovecha los mejores precios en TECLYSE",
    boton: "Ver ofertas",
    link: "/productos",
  },
];

export default function Carrusel() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const anterior = () => {
    setActual((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const siguiente = () => {
    setActual((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[450px] sm:h-[550px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === actual ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center flex items-center"
            style={{ backgroundImage: `url(${slide.imagen})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 px-8 sm:px-16 w-full flex justify-center mt-auto mb-16">
              <Link href={slide.link}>
                <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl text-lg transition shadow-lg">
                  {slide.boton}
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* FLECHAS */}
      <button
        onClick={anterior}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-cyan-500 hover:text-black text-white w-10 h-10 rounded-full flex items-center justify-center transition"
      >
        ‹
      </button>
      <button
        onClick={siguiente}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-cyan-500 hover:text-black text-white w-10 h-10 rounded-full flex items-center justify-center transition"
      >
        ›
      </button>

      {/* INDICADORES */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActual(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === actual ? "bg-cyan-400" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}