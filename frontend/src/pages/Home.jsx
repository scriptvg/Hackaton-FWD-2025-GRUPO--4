import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, ShoppingCart } from "lucide-react";

// Home page sections
import Carousel from "@components/organisms/Carousel";
import FeatureCard from "@components/atoms/FeatureCard";
import Impact from "@components/layouts/Impact";
import WhatToFind from "@components/home/WhatToFind";
import TestimonialsCarousel from "@components/organisms/TestimonialsCarousel";
import EducationalServices from "@components/layouts/EducationalServices";
import CallToAction from "@components/layouts/CallToAction";
import ContactSection from "@components/layouts/ContacSection";
import Newsletter from "@components/atoms/Newsletter";
import { ThemeToggle } from "@components/atoms/DarkModeToggle";  


// Card base style with dark mode support
const cardStyle = `
  bg-white dark:bg-[var(--card)]
  rounded-2xl border border-gray-200 dark:border-gray-700
  shadow-sm dark:shadow-none hover:shadow-lg
  transition-all duration-300 p-6 flex flex-col justify-between
  focus-within:ring-2 focus-within:ring-[#125E5C]
  focus-within:ring-offset-2 dark:focus-within:ring-offset-[var(--background)]
`;

function Home() {
  return (
    <main
      className="
        bg-white dark:bg-[var(--background)]
        text-gray-900 dark:text-[var(--foreground)]
        transition-colors duration-300
      "
    >
      {/* Hero carousel with emotional and visual impact */}
      <Carousel />
      <ThemeToggle />

      {/* Feature section: schedule, pricing, ticket purchase */}
      <section
        aria-label="Información principal"
        className="
          grid grid-cols-1 md:grid-cols-3 gap-6
          max-w-6xl mx-auto mt-12 px-4
        "
      >
        {/* Horario */}
        <FeatureCard
          icon={<Calendar className="w-6 h-6 text-[#125E5C]" />}
          title="Horario"
          description={
            <div className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <p className="font-semibold text-[#125E5C]">Martes a Domingo</p>
              <p className="text-base font-medium">9:00am - 4:30pm</p>
              <p className="text-xs font-semibold text-[#A20B13] mt-2">
                Cerrado los Lunes
              </p>
            </div>
          }
          className={cardStyle}
        />

        {/* Tarifas */}
        <FeatureCard
          icon={<Users className="w-6 h-6 text-[#125E5C]" />}
          title="Tarifas"
          description={
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {[
                ["Adultos", "₡2900"],
                ["Niños (4-11)", "₡1600"],
                ["Adulto mayor / Discapacitado", "₡1600"],
                ["Extranjeros adultos", "$10"],
                ["Extranjeros niños (4-11)", "$5"],
              ].map(([label, price], index) => (
                <li key={index} className="flex justify-between">
                  <span className="font-medium">{label}</span>
                  <span className="text-gray-800 dark:text-gray-100 font-semibold">
                    {price}
                  </span>
                </li>
              ))}
            </ul>
          }
          className="
            bg-white dark:bg-[var(--card)]
            rounded-xl border border-gray-200 dark:border-gray-700
            shadow-md dark:shadow-none p-6 hover:shadow-lg
            transition-all duration-300
            focus-within:ring-2 focus-within:ring-[#125E5C]
            focus-within:ring-offset-2 dark:focus-within:ring-offset-[var(--background)]
          "
        />

        {/* Compra de entradas */}
        <FeatureCard
          icon={<ShoppingCart className="w-6 h-6 text-[#125E5C]" />}
          title="Compra de Entradas"
          description={
            <div className="flex flex-col h-full justify-between">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 font-medium">
                Adquiere tus entradas en línea y evita filas
              </p>
              <Link
                to="/purchase-form/ticketera"
                className="
                  mt-auto block w-full text-center
                  bg-[#1CB6B0] hover:bg-[#139a95]
                  dark:bg-[var(--primary)] dark:hover:bg-[var(--primary-foreground)]
                  text-white dark:text-white
                  py-2 px-4 rounded-md
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#125E5C]
                  dark:focus-within:ring-offset-[var(--background)]
                "
              >
                Comprar Ahora
              </Link>
            </div>
          }
          className="
            bg-white dark:bg-[var(--card)]
            rounded-xl border border-gray-200 dark:border-gray-700
            shadow-md dark:shadow-none p-6 hover:shadow-lg
            transition-all duration-300
            focus-within:ring-2 focus-within:ring-[#125E5C]
            focus-within:ring-offset-2 dark:focus-within:ring-offset-[var(--background)]
          "
        />
      </section>

      {/* Emotional impact section */}
      <section
        className="
          bg-gray-50 dark:bg-[var(--background)]
          py-16 mt-10 transition-colors duration-300
        "
      >
        <Impact />
      </section>

      {/* Informational and testimonial sections */}
      <WhatToFind />
      <TestimonialsCarousel />
      <EducationalServices />
      <CallToAction />
      <ContactSection />
      <Newsletter />
    </main>
  );
}

export default Home;
