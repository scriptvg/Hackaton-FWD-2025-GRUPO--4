// src/components/tabs/ProyectosTab.jsx
import React, { memo } from "react";

function ProyectosTab({ proyectos = [] }) {
  return (
    <section aria-labelledby="proyectos-heading" className="space-y-6">
      {/* Section heading for screen readers */}
      <h2
        id="proyectos-heading"
        className="text-center text-teal-600 text-xl font-bold"
      >
        Proyectos Actuales
      </h2>

      {/* List of projects */}
      <ul
        aria-label="Lista de proyectos actuales"
        className="space-y-6"
        role="list"
      >
        {proyectos.map((p, i) => {
          const { id, titulo, descripcion, img, tags = [], duracion } = p;
          const key = id ?? `proyecto-${i}`;

          return (
            <li key={key} role="listitem">
              {/* Each project container */}
              <article className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-4">
                {/* Project image or placeholder */}
                <figure className="w-full md:w-1/4 h-32 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                  {img ? (
                    <img
                      src={img}
                      alt={titulo}
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span
                      role="img"
                      aria-label="Sin imagen"
                      className="text-gray-400 text-2xl"
                    >
                      📷
                    </span>
                  )}
                </figure>

                {/* Project details */}
                <div className="w-full">
                  <h3 className="text-teal-600 font-semibold" id={`${key}-title`}>
                    {titulo}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">{descripcion}</p>

                  {/* Tag list */}
                  <ul
                    role="list"
                    aria-label={`Etiquetas de ${titulo}`}
                    className="flex flex-wrap gap-2 mb-2"
                  >
                    {tags.map((tag, j) => (
                      <li key={j}>
                        <span className="text-xs bg-teal-100 text-teal-700 font-medium px-2 py-1 rounded">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-gray-500 mb-3">
                    Duración: {duracion}
                  </p>

                  {/* Accessible action button */}
                  <button
                    type="button"
                    className="
                      text-sm bg-teal-500 text-white px-4 py-1 rounded
                      hover:bg-teal-600 transition-colors duration-150
                      focus:outline-none focus-visible:ring-2
                      focus-visible:ring-offset-2 focus-visible:ring-teal-300
                    "
                    aria-labelledby={`${key}-title`}
                  >
                    Más Información
                  </button>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// Memoize to avoid unnecessary re-renders when props don't change
export default memo(ProyectosTab);
