// src/components/tabs/PublicacionesTab.jsx
import React, { memo } from "react";

function PublicacionesTab({ publicaciones = [], stats = {} }) {
  return (
    <section
      aria-labelledby="publicaciones-heading"
      className="space-y-8"
    >
      {/* Section heading */}
      <h2
        id="publicaciones-heading"
        className="text-center text-teal-600 text-xl font-bold"
      >
        Publicaciones Científicas
      </h2>

      {/* Publications list */}
      <div className="bg-gray-50 rounded-lg p-4">
        <ul
          role="list"
          aria-label="Listado de publicaciones científicas"
          className="space-y-2"
        >
          {publicaciones.map((pub, i) => {
            const {
              id,
              autores,
              anio,
              enlace,
              titulo,
              revista,
            } = pub;
            const key = id ?? `pub-${i}`;

            return (
              <li key={key} className="text-sm">
                <p className="text-gray-800 font-semibold">
                  {autores}{" "}
                  <span className="font-normal text-gray-600">
                    ({anio}).
                  </span>
                </p>

                <a
                  href={enlace || "#"}
                  target={enlace ? "_blank" : undefined}
                  rel={enlace ? "noopener noreferrer" : undefined}
                  className="text-teal-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-300"
                >
                  {titulo}
                </a>

                <p className="text-gray-500 text-xs">{revista}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Statistics summary */}
      <dl
        aria-label="Estadísticas de publicaciones"
        className="grid grid-cols-3 text-center gap-6"
      >
        <div>
          <dt className="text-2xl text-teal-600 font-bold">
            {stats.articulos || "45+"}
          </dt>
          <dd className="text-sm">Artículos publicados</dd>
        </div>
        <div>
          <dt className="text-2xl text-teal-600 font-bold">
            {stats.tesis || "12"}
          </dt>
          <dd className="text-sm">Tesis</dd>
        </div>
        <div>
          <dt className="text-2xl text-teal-600 font-bold">
            {stats.libros || "8"}
          </dt>
          <dd className="text-sm">Libros y capítulos</dd>
        </div>
      </dl>

      {/* Call-to-action */}
      <div className="text-center">
        <button
          type="button"
          className="
            bg-teal-500 text-white px-6 py-2 rounded
            hover:bg-teal-600 transition-colors duration-150
            focus:outline-none focus-visible:ring-2
            focus-visible:ring-offset-2 focus-visible:ring-teal-300
          "
          aria-label="Ver todas las publicaciones"
        >
          Ver Todas las Publicaciones
        </button>
      </div>
    </section>
  );
}

export default memo(PublicacionesTab);
