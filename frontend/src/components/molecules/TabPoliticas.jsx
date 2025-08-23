import React, { useState, memo } from "react";

const politicas = [
  {
    titulo: "Política de Conflicto de Intereses",
    contenido:
      "Esta política establece los lineamientos para identificar y gestionar posibles conflictos de intereses que puedan surgir en el desarrollo de nuestras actividades.",
  },
  {
    titulo: "Código de Ética",
    contenido:
      "Nuestro código de ética establece los principios y valores que guían el comportamiento de todos los miembros de la organización.",
  },
  {
    titulo: "Política de Conservación",
    contenido:
      "Esta política establece los lineamientos para la conservación y manejo sostenible de los recursos marinos y costeros.",
  },
  {
    titulo: "Política de Investigación Científica",
    contenido:
      "Marco normativo para el desarrollo de investigaciones científicas en el parque.",
  },
];

// Componente memoizado para cada ítem de política
const PoliticaItem = memo(function PoliticaItem({ id, titulo, contenido, isOpen, onToggle }) {
  const panelId = `panel-${id}`;
  const buttonId = `button-${id}`;

  return (
    <li className="py-4">
      <button
        id={buttonId}
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="w-full text-left flex justify-between items-center font-semibold text-gray-800 text-base hover:text-teal-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
      >
        {titulo}
        <span aria-hidden="true" className="text-teal-600 text-xl">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="mt-2 text-sm text-gray-600 leading-relaxed"
        >
          {contenido}
        </div>
      )}
    </li>
  );
});

export default function TabPoliticas() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      aria-labelledby="politicas-heading"
      className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 max-w-4xl mx-auto w-full hover:shadow-xl transition-all"
    >
      <header className="mb-6">
        <h2 id="politicas-heading" className="text-teal-600 font-bold text-lg">
          Políticas Institucionales
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Conozca nuestras políticas y lineamientos que guían nuestro trabajo
          diario.
        </p>
      </header>

      <ul className="divide-y divide-gray-200">
        {politicas.map((p, i) => (
          <PoliticaItem
            key={i}
            id={i}
            titulo={p.titulo}
            contenido={p.contenido}
            isOpen={activeIndex === i}
            onToggle={() => toggleIndex(i)}
          />
        ))}
      </ul>
    </section>
  );
}
