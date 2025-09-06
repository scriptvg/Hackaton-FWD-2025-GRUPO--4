// src/components/tabs/ColaboracionesTab.jsx
import React from "react";

export default function ColaboracionesTab({ colaboradores = [], redes = [], img, alt }) {
  return (
    <section className="space-y-10" aria-labelledby="colaboraciones-title">
      {/* Colaboraciones */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Imagen */}
        <div className="w-full md:w-1/2 h-64 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
          {img ? (
            <img
              src={img}
              alt={alt || "Imagen de colaboraciones"}
              className="w-full h-full object-cover rounded"
              loading="lazy"
            />
          ) : (
            <span className="text-gray-400 text-sm">📷 Imagen no disponible</span>
          )}
        </div>

        {/* Texto */}
        <div className="w-full md:w-1/2">
          <h2
            id="colaboraciones-title"
            className="text-teal-600 text-xl font-bold mb-2"
          >
            Colaboraciones y Alianzas
          </h2>
          <p className="text-gray-700 mb-4">
            El Parque Marino del Pacífico de Costa Rica cuenta con la colaboración
            de varias instituciones y organizaciones clave para llevar a cabo su
            misión de sostenibilidad de los recursos marino-costeros.
          </p>

          {/* Lista de colaboradores */}
          {colaboradores.length > 0 && (
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-teal-600 font-semibold mb-2">
                Principales Colaboradores:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {colaboradores.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Botón accesible */}
          <button
            className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 transition"
            aria-label="Proponer una nueva colaboración"
          >
            Proponer Colaboración
          </button>
        </div>
      </div>

      {/* Redes */}
      <div className="space-y-4">
        <h3 className="text-teal-600 text-lg font-bold text-center">
          Redes y Consorcios
        </h3>

        {redes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {redes.map((r, i) => (
              <article
                key={i}
                className="bg-white rounded p-4 shadow flex flex-col justify-between"
                aria-labelledby={`red-${i}`}
              >
                <div>
                  <h4
                    id={`red-${i}`}
                    className="text-teal-600 font-semibold text-base"
                  >
                    {r.nombre}
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">{r.descripcion}</p>
                  <p className="text-xs text-gray-500 mb-4">
                    Miembro desde {r.membresia}
                  </p>
                </div>
                <a
                  href={r.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-teal-500 text-white px-4 py-1 rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 transition w-fit"
                  aria-label={`Visitar el sitio de ${r.nombre}`}
                >
                  Visitar Sitio
                </a>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center">
            Actualmente no hay redes o consorcios registrados.
          </p>
        )}
      </div>
    </section>
  );
}
