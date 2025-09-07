import React from "react";
import { Users, Fish, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

// Stats data with semantic and emotional clarity
const stats = [
  {
    icon: <Users className="h-8 w-8 text-[#0D5E58] dark:text-[#FF6900]" aria-hidden="true" />,
    value: "25,000",
    label: "Visitantes anuales",
  },
  {
    icon: <Fish className="h-8 w-8 text-[#0D5E58] dark:text-[#FF6900]"  aria-hidden="true" />,
    value: "150",
    label: "Especies marinas",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-[#0D5E58] dark:text-[#FF6900]" aria-hidden="true" />,
    value: "45",
    label: "Programas educativos",
  },
  {
    icon: <Award className="h-8 w-8 text-[#0D5E58] dark:text-[#FF6900]" aria-hidden="true" />,
    value: "12",
    label: "Años de conservación",
  },
];

function Impact() {
  return (
    <section
      role="region"
      aria-label="Indicadores de impacto del parque marino"
      className="
        max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20
        bg-white dark:bg-[var(--background)]
        text-[#202020] dark:text-[#F9FAFC]
        transition-colors duration-300
      "
    >
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="
            text-3xl md:text-4xl font-extrabold mb-4 uppercase
            text-[#202020] dark:text-[#F9FAFC]
          ">
          Nuestro Impacto
        </h2>
        <p className="text-lg text-[#202020] dark:text-[#F9FAFC]">
          Trabajamos diariamente por la conservación marina y la educación ambiental
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="
              bg-white dark:bg-[var(--card)]
              p-6 rounded-xl
              shadow-[0_4px_20px_rgba(0,0,0,0.08)]
              dark:shadow-none
              hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
              transition-all duration-300
              focus-within:ring-2 focus-within:ring-[#2FC8C2] dark:focus-within:ring-[#FF6900]
              focus-within:ring-offset-2 dark:focus-within:ring-offset-[var(--background)]
            "
            tabIndex={0}
            aria-label={`${stat.label}: ${stat.value}`}
          >
            <div className="
                
                p-3 rounded-lg w-14 h-14
                flex items-center justify-center mx-auto mb-4
              ">
              {stat.icon}
            </div>
            <h3 className="
                text-3xl font-bold mb-1
                text-[#202020] dark:text-[#F9FAFC]
              ">
              {stat.value}
            </h3>
            <p className="text-sm text-[#202020] dark:text-[#F9FAFC]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Impact;
