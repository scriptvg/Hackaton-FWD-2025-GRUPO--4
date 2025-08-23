import React from "react";
import {
  FileBadge,
  CalendarCheck2,
  Building2,
  Download,
} from "lucide-react";

// Static certification data
const certificaciones = [
  {
    titulo: "Certificación de Buenas Prácticas Ambientales",
    organizacion: "Ministerio de Ambiente y Energía (MINAE)",
    descripcion:
      "Reconocimiento por cumplimiento de estándares ambientales en la gestión de recursos costeros y marinos.",
    fecha: "05/02/2023",
    tipo: "PDF",
  },
  {
    titulo: "Sello de Transparencia 2023",
    organizacion: "Transparencia Internacional - Capítulo CR",
    descripcion:
      "Certificación otorgada por mantener procesos abiertos de rendición de cuentas y datos públicos.",
    fecha: "10/07/2023",
    tipo: "PDF",
  },
  {
    titulo: "Reconocimiento en Educación Ambiental",
    organizacion: "Organización Mundial de Educación para la Sostenibilidad",
    descripcion:
      "Premio a la excelencia por programas educativos marino-costeros dirigidos a comunidades locales.",
    fecha: "15/11/2023",
    tipo: "PDF",
  },
];

export default function TabCertificaciones() {
  return (
    <section
      aria-labelledby="certificaciones-heading"
      className="p-6 bg-white rounded-xl shadow max-w-7xl mx-auto"
    >
      {/* Section heading for screen readers */}
      <h2
        id="certificaciones-heading"
        className="text-teal-600 font-bold text-lg mb-2"
      >
        Certificaciones y Reconocimientos
      </h2>

      {/* Introductory description */}
      <p className="text-sm text-gray-600 mb-6">
        A continuación, se presentan los certificados institucionales obtenidos
        por cumplimiento ambiental, educativo y de transparencia.
      </p>

      {/* Certification cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificaciones.map((cert, idx) => (
          <article
            key={idx}
            className="border rounded-lg p-5 shadow hover:shadow-md transition bg-white flex flex-col justify-between h-full"
            aria-labelledby={`cert-title-${idx}`}
          >
            {/* Title and icon */}
            <header className="flex items-center gap-2 text-teal-600 font-semibold mb-1">
              <FileBadge size={20} aria-hidden="true" />
              <h3 id={`cert-title-${idx}`} className="text-base">
                {cert.titulo}
              </h3>
            </header>

            {/* Organization */}
            <div className="text-sm text-gray-600 mb-2 italic">
              {cert.organizacion}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-3">{cert.descripcion}</p>

            {/* Footer with date and download */}
            <footer className="flex justify-between items-center text-sm text-gray-500 mt-auto pt-2 border-t">
              <div className="flex gap-2 items-center">
                <CalendarCheck2 size={16} aria-hidden="true" />
                <span>{cert.fecha}</span>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 text-teal-600 hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label={`Descargar ${cert.titulo} en formato ${cert.tipo}`}
              >
                <Download size={16} aria-hidden="true" />
                Descargar
              </button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
