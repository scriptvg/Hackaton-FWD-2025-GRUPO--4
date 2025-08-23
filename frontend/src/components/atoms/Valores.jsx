import React from "react";
import { GiWaveCrest } from "react-icons/gi";
import { MdCastForEducation } from "react-icons/md";
import { MdContentPasteSearch } from "react-icons/md";
import { MdOutlineRecycling } from "react-icons/md";
import { LuHeartHandshake } from "react-icons/lu";
import { HiOutlineDocumentSearch } from "react-icons/hi";

const valores = [
  {
    icon: <GiWaveCrest />,
    title: "Conservación",
    description:"Protegemos y preservamos la biodiversidad marina y costera de Costa Rica.",
  },
  {
    icon: <MdCastForEducation />,
    title: "Educación",
    description:"Promovemos la conciencia ambiental y el conocimiento sobre los ecosistemas marinos.",
  },
  {
    icon: <MdContentPasteSearch />,
    title: "Investigación",
    description: "Generamos conocimiento científico para la toma de decisiones en conservación marina.",
  },
  {
    icon: <MdOutlineRecycling />,
    title: "Sostenibilidad",
    description: "Fomentamos el uso responsable y sostenible de los recursos marinos.",
  },
  {
    icon: <LuHeartHandshake />,
    title: "Colaboración",
    description: "Trabajamos en conjunto con instituciones nacionales e internacionales.",
  },
  {
    icon: <HiOutlineDocumentSearch />,
    title: "Transparencia",
    description: "Actuamos con honestidad y rendimos cuentas de nuestras acciones.",
  },
];

export default function Valores() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-center font-semibold text-xl mb-8">Nuestros Valores</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {valores.map(({ icon, title, description }, index) => (
          <div
            key={index}
            className="bg-blue-50 rounded-lg p-6 text-center shadow-sm"
          >
            <div className="text-3xl mb-2 flex justify-center items-center">{icon}</div>
            <h3 className="text-teal-600 font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 text-sm">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
