import { useCarousel } from "../../hooks/useCarousel";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import placeholder from "@assets/placeholder.svg";

// Testimonials data
const testimonials = [
  {
    name: "María Rodríguez",
    role: "Visitante",
    text: "Una experiencia increíble para toda la familia. Los niños aprendieron mucho sobre la vida marina y la importancia de su conservación. ¡Definitivamente volveremos!",
    image: placeholder,
    rating: 5,
  },
  {
    name: "Carlos Méndez",
    role: "Turista",
    text: "El personal fue muy amable y los acuarios están muy bien cuidados. Aprendí mucho sobre especies que no conocía.",
    image: placeholder,
    rating: 4,
  },
  {
    name: "Ana Sofía López",
    role: "Visitante",
    text: "Excelente lugar para pasar el día. Todo está muy bien organizado y limpio.",
    image: placeholder,
    rating: 5,
  },
];

export default function TestimonialsCarousel() {
  const {
    sliderRef,
    instanceRef,
    currentSlide,
    progress,
    handlePause,
    handleResume,
  } = useCarousel(testimonials);

  (testimonials);

  return (
    <section
      role="region"
      aria-label="Testimonios de visitantes"
      className="
        bg-[#f8f9fa] dark:bg-[#202020]
        text-[#202020] dark:text-[#F9FAFC]
        py-20 px-4
      "
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold uppercase">
          Lo que dicen nuestros visitantes
        </h2>
        <div className="w-20 h-1 bg-[#1CB6B0] mx-auto my-4 rounded"></div>
        <p className="text-[#202020]0 dark:text-[#F9FAFC] mb-10">
          Experiencias de quienes han disfrutado del Parque Marino
        </p>

        {/* Carousel */}
        <div
          ref={sliderRef}
          className="keen-slider relative"
          aria-live="polite"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") instanceRef.current?.prev();
            if (e.key === "ArrowRight") instanceRef.current?.next();
          }}
        >
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="keen-slider__slide flex flex-col items-center justify-center px-6 md:px-12 text-center"
              onMouseEnter={handlePause}
              onMouseLeave={handleResume}
            >
              <Quote
                aria-hidden="true"
                className="w-12 h-12 text-[#2FC8C2] dark:text-[#1CB6B0] mb-6"
              />

              <img
                src={item.image || placeholder}
                alt={`Foto de ${item.name}`}
                className="w-20 h-20 rounded-full border-4 border-[#1CB6B0] mb-6 object-cover"
                loading="lazy"
              />

              <p className="italic text-[#202020] dark:text-[#F9FAFC] mb-6 max-w-xl">
                {item.text}
              </p>
              <h3 className="text-lg font-semibold text-[#202020] dark:text-[#F9FAFC]">
                {item.name}
              </h3>
              <p className="text-[#202020] dark:text-[#F9FAFC] text-sm">
                {item.role}
              </p>

              <div
                className="flex mt-2 justify-center"
                role="img"
                aria-label={`Calificación: ${item.rating} de 5`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`
                      text-[#FF6900] text-xl
                      ${i < item.rating ? "" : "opacity-30"}
                    `}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Prev/Next */}
          <button
            onClick={() => instanceRef.current?.prev()}
            aria-label="Testimonio anterior"
            className="
              absolute left-4 top-1/2 transform -translate-y-1/2
              bg-[#202020]  dark:bg-[#2FC8C2] shadow-md
              w-10 h-10 rounded-full flex items-center justify-center
              focus:outline-none focus:ring-2 focus:ring-[#1CB6B0]
              dark:focus:ring-[#2FC8C2] 
            "
          >
            <ChevronLeft
              aria-hidden="true"
              className="w-5 h-5  text-white dark:text-[#202020]"
            />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            aria-label="Siguiente testimonio"
            className="
              absolute right-4 top-1/2 transform -translate-y-1/2
              bg-[#202020] dark:bg-[#2FC8C2] shadow-md
              w-10 h-10 rounded-full flex items-center justify-center
              focus:outline-none focus:ring-2 focus:ring-[#1CB6B0]
              dark:focus:ring-[#2FC8C2]
            "
          >
            <ChevronRight
              aria-hidden="true"
              className="w-5 h-5 text-white dark:text-[#202020]"
            />
          </button>

          {/* Progress */}
          <div className="flex justify-center gap-2 mt-6">
            {progress.map((p, i) => (
              <div
                key={i}
                role="progressbar"
                aria-valuenow={Math.round(p * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                className="relative w-4 h-4 rounded-full bg-[#1CB6B0]/30 dark:bg-[#1CB6B0]/20 overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 h-full bg-[#1CB6B0] rounded-full transition-[width]"
                  style={{ width: `${p * 100}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
