import React, { memo } from "react";
import { Star } from "lucide-react";
import organigramaImg from "@assets/placeholder.svg";

const testimonios = [
  {
    nombre: "Carlos Rodríguez",
    cargo: "Director de Transparencia Internacional CR",
    texto:
      "El Parque Marino Central del Pacífico Sur es un ejemplo de transparencia institucional. Su portal de transparencia proporciona información clara y accesible sobre su gestión financiera y administrativa.",
    fecha: "Mayo 2023",
    estrellas: 5,
  },
  {
    nombre: "María Fernández",
    cargo: "Auditora Independiente",
    texto:
      "Como auditora, valoro enormemente la calidad y detalle de la información financiera que publica el Parque Marino. Facilita enormemente nuestro trabajo y demuestra un compromiso real con la rendición de cuentas.",
    fecha: "Octubre 2023",
    estrellas: 5,
  },
  {
    nombre: "Roberto Méndez",
    cargo: "Donante Corporativo",
    texto:
      "La transparencia en el uso de los recursos fue un factor determinante para que nuestra empresa decidiera apoyar al Parque Marino. Podemos ver claramente cómo se utilizan nuestras donaciones.",
    fecha: "Enero 2024",
    estrellas: 4,
  },
];

// Componente memoizado para cada testimonio
const TestimonioCard = memo(function TestimonioCard({
  nombre,
  cargo,
  texto,
  fecha,
  estrellas,
}) {
  return (
    <article
      className="border border-gray-100 bg-gray-50 rounded-xl p-4 hover:bg-white transition-all shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
      tabIndex="0"
      aria-labelledby={`testi-${nombre.replace(/\s+/g, "-")}-label`}
    >
      <header>
        <h4
          id={`testi-${nombre.replace(/\s+/g, "-")}-label`}
          className="font-semibold text-gray-800 text-base"
        >
          {nombre}
        </h4>
        <p className="text-sm text-gray-500">{cargo}</p>
      </header>

      <blockquote className="mt-3 text-sm text-gray-700">
        <p>{texto}</p>
      </blockquote>

      <footer className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div
          role="img"
          aria-label={`${estrellas} de 5 estrellas`}
          className="flex space-x-1 text-yellow-400"
        >
          {Array.from({ length: estrellas }).map((_, idx) => (
            <Star key={idx} size={16} fill="currentColor" aria-hidden="true" />
          ))}
        </div>
        <time dateTime={fecha}>
          {fecha}
        </time>
      </footer>
    </article>
  );
});

export default function TabOrganigramaTestimonios() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {/* Organigrama */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
        <figure>
          <header className="inline-flex items-center justify-between mb-2">
            <h3 className="text-teal-600 font-bold text-lg">
              Organigrama Institucional
            </h3>
          </header>

          <figcaption className="text-gray-600 text-sm mb-4">
            Conozca la estructura organizativa del Parque Marino y las
            responsabilidades de cada área.
          </figcaption>

          <button
            type="button"
            onClick={() => window.open(organigramaImg, "_blank")}
            className="block w-full max-w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl border border-gray-100 overflow-hidden transition-transform hover:scale-105"
            aria-label="Abrir organigrama en ventana nueva"
          >
            <img
              src={organigramaImg}
              alt="Organigrama institucional del Parque Marino Central"
              loading="lazy"
              className="w-full h-auto"
            />
          </button>
        </figure>
      </div>

      {/* Testimonios */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
        <header className="inline-flex items-center justify-between mb-4">
          <h3 className="text-teal-600 font-bold text-lg">Testimonios</h3>
        </header>

        <div className="space-y-4">
          {testimonios.map((t) => (
            <TestimonioCard
              key={`${t.nombre}-${t.fecha}`}
              {...t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
