import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-[#1CB6B0] py-16 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left text block */}
        <div className="text-white max-w-xl">
          <h2
            id="newsletter-heading"
            className="text-2xl md:text-3xl font-bold text-gray-900"
          >
            Mantente Informado
          </h2>
          <p className="mt-2 text-white">
            Suscríbete a nuestro boletín para recibir noticias, eventos y
            novedades del Parque Marino.
          </p>
        </div>

        {/* Newsletter subscription form */}
        <form
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: Add submission logic or API call here
          }}
          aria-label="Formulario de suscripción al boletín"
        >
          <label htmlFor="email" className="sr-only">
            Tu correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Tu correo electrónico"
            className="w-full px-4 py-2 rounded-md border border-white text-white placeholder-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
            aria-required="true"
            aria-invalid="false"
          />
          <button
            type="submit"
            className="bg-white text-[#1CB6B0] hover:bg-gray-100 px-6 py-2 rounded-md font-semibold flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            Suscribirse <Mail className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}
