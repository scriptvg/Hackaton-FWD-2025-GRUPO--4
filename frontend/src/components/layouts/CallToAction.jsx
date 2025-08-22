import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section
      role="region"
      aria-labelledby="cta-title"
      className="bg-[#1CB6B0] text-white text-center py-16 px-4 rounded-2xl shadow-md focus-within:ring-2 focus-within:ring-white"
    >
      {/* Título principal con semántica accesible */}
      <h2
        id="cta-title"
        className="text-2xl md:text-3xl font-extrabold mb-4 uppercase tracking-wide"
      >
        ¡Ayúdanos a conservar nuestros océanos!
      </h2>

      {/* Descripción con lectura fluida */}
      <p
        className="text-lg max-w-3xl mx-auto mb-8 leading-relaxed"
        aria-describedby="cta-description"
        id="cta-description"
      >
        Tu apoyo es fundamental para continuar con nuestra labor de conservación,
        investigación y educación ambiental.
      </p>

      {/* Botones con foco visible y roles claros */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/apoyo/donaciones"
          role="button"
          aria-label="Hacer una donación para conservar los océanos"
          className="bg-white text-[#1CB6B0] font-semibold px-6 py-3 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Hacer una Donación
        </Link>

        <Link
          to="/apoyo/voluntariado"
          role="button"
          aria-label="Unirse como voluntario en la conservación marina"
          className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[#1CB6B0] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Ser Voluntario
        </Link>
      </div>

      {/* Icono decorativo con aria-hidden */}
      <div className="mt-8 flex justify-center" aria-hidden="true">
        <Heart className="w-6 h-6 text-white opacity-80" />
      </div>
    </section>
  );
}
