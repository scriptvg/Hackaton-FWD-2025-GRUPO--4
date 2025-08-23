import React from 'react';
import { FaRegUser } from "react-icons/fa";

function SuccessCases() {
  const cases = [
    {
      name: 'Cooperativa Marítima de Puntarenas',
      subtitle: 'Cultivo de pargo manchado',
      quote: 'Gracias a la capacitación y asistencia técnica del Parque Marino, logramos implementar un sistema de cultivo de pargo manchado que ha generado empleo para 15 familias de pescadores y ha diversificado nuestras fuentes de ingresos. La tecnología que nos transfirieron es adaptada a nuestras condiciones y nos ha permitido producir de manera sostenible.',
      author: 'Carlos Mora, Presidente',
      img: '', // Puedes colocar una ruta si tienes imágenes
    },
    {
      name: 'Acuícola del Pacífico S.A.',
      subtitle: 'Producción de semilla de ostras',
      quote: 'La colaboración con el programa de acuicultura del Parque Marino nos permitió establecer el primer laboratorio privado de producción de semilla de ostras en Costa Rica. El apoyo técnico y la transferencia de tecnología fueron fundamentales para superar los desafíos iniciales y lograr una producción estable que abastece a cultivadores de toda la región.',
      author: 'María Fernández, Gerente Técnica',
      img: '',
    }
  ];

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold text-center text-teal-600 mb-10">Casos de Éxito</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {cases.map((item, index) => (
          <div
            key={index}
            className="rounded-lg p-6 bg-white shadow-sm flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xl">
                {/* Imagen (si se desea personalizar) */}
                <span><FaRegUser /></span>
              </div>
              <div>
                <h3 className="text-teal-600 font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.subtitle}</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"{item.quote}"</p>
            <p className="text-right text-gray-500 text-sm">– {item.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SuccessCases;
