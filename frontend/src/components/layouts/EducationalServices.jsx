import placeholder from "@assets/placeholder.svg";


import { Link } from "react-router-dom";

// Educational services data
const services = [
  {
    img: "https://res.cloudinary.com/dmgz3csfp/image/upload/v1756025231/monitoreo_szfver.jpg",
    title: "Visitas Guiadas",
    description: "Recorridos educativos con guías especializados en biología marina.",
    tag: "Popular",
    tagColor: "bg-[#1CB6B0] text-[#202020]",
    action: "Reservar",
    detail: "Desde ₡3500",
  },
  {
    img: "https://res.cloudinary.com/dmgz3csfp/image/upload/v1756027090/pul_xts88s.jpg",
    title: "Charlas Educativas",
    description: "Presentaciones sobre conservación marina y biodiversidad.",
    action: "Más Info",
    detail: "Grupos escolares",
  },
  {
    img: "https://res.cloudinary.com/dmgz3csfp/image/upload/v1756025316/massi_cnvx2s.jpg",
    title: "Talleres",
    description: "Actividades prácticas sobre biología marina y conservación.",
    tag: "Nuevo",
    tagColor: "bg-[#FF6900] text-[#202020]",
    action: "Inscribirse",
    detail: "Todas las edades",
  },
];

export default function EducationalServices() {
  return (
    <section
      role="region"
      aria-label="Servicios educativos del parque marino"
      className="
        py-20 px-4
        bg-white dark:bg-[var(--background)]
        text-center text-[#202020] 
        transition-colors duration-100
      "
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold uppercase
                       text-[#202020]  dark:text-[#F9FAFC]">
          Descubre nuestros servicios educativos
        </h2>
        <div className="w-24 h-1 bg-[#1CB6B0] mx-auto my-4 rounded"></div>
        <p className="text-[#202020]  dark:text-[#F9FAFC] mb-12 max-w-xl mx-auto">
          Programas diseñados para todas las edades que promueven la educación ambiental y la conservación marina
        </p>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              className="
                group rounded-xl overflow-hidden
                bg-white dark:bg-[var(--card)]
                dark:border-gray-700
                shadow-sm dark:shadow-none
                hover:shadow-lg transition duration-300
                focus-within:ring-2 focus-within:ring-[#1CB6B0]
                focus-within:ring-offset-2 dark:focus-within:ring-offset-[var(--background)]
              "
              tabIndex={0}
              aria-label={`${s.title}: ${s.description}`}
            >
              {/* Imagen con efecto de zoom */}
              <div className="relative">
                <img
                  src={s.img}
                  alt={`Imagen de ${s.title}`}
                  className="w-full h-48 object-cover
                             transition-transform duration-300 group-hover:scale-105"
                />
                {s.tag && (
                  <span
                    className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-semibold shadow-sm ${s.tagColor}`}
                  >
                    {s.tag}
                  </span>
                )}
              </div>

              {/* Contenido textual */}
              <div className="p-6 space-y-3 text-left">
                <h3 className="text-lg font-bold text-[#0D5E58] dark:text-[#2FC8C2] tracking-tight">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-[#F9FAFC] leading-relaxed">
                  {s.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <button
                    className="bg-[#2FC8C2] hover:bg-[#139a95] dark:text-[#202020] text-sm px-4 py-2 rounded-xl font-medium
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2FC8C2]
                      transition-colors duration-100"
                    aria-label={`Acción: ${s.action} para ${s.title}`}
                  >
                    {s.action}
                  </button>
                  <span className="text-sm font-semibold
                                   text-gray-700 dark:text-[#F9FAFC]">
                    {s.detail}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to full services */}
        <div className="mt-12">
          <Link
            to="/exhibiciones-y-servicios/servicios-educativos"
            target="_blank"
            className="
              inline-flex items-center gap-2 px-6 py-2 text-sm font-medium
              border-2 border-[#0D5E58] rounded-lg
              text-[#0D5E58] hover:bg-[#0D5E58] hover:text-white
              dark:border-[#2FC8C2] dark:text-[#F9FAFC]
              dark:hover:bg-[#2FC8C2] dark:hover:text-[#202020]
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-[#0D5E58]
            "
            aria-label="Ver todos los servicios educativos"
          >
            Ver todos los servicios educativos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
