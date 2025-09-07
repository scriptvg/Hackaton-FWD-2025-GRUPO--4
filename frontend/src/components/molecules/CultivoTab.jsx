// src/components/tabs/CultivoTab.jsx

import React from 'react';



export default function CultivoTab() {
  const especies = [
    { name: 'Pargo manchado', name_cientific: "𝐿𝓊𝓉𝒿𝒶𝓃𝓊𝓈 𝑔𝓊𝓉𝓉𝒶𝓉𝓊𝓈", desc: 'Este es uno de los peces más destacados en los proyectos de cultivo del Parque Marino.', img: "https://res.cloudinary.com/dmgz3csfp/image/upload/v1756027206/pargo_manchado_g9stpx.jpg"  },
    { name: 'Corvina Reina', name_cientific: "𝒞𝓎𝓃𝑜𝓈𝒸𝒾𝑜𝓃 𝒶𝓁𝒷𝓊𝓈", desc: 'Recientemente, se ha informado sobre la entrega de juveniles de corvina para cultivo en granjas marinas.' , img: "https://res.cloudinary.com/dmgz3csfp/image/upload/v1756027240/corvina_aguada_cuenos.jpg" },
    { name: 'Ostra japonesa', name_cientific: "𝒞𝓇𝒶𝓈𝓈𝑜𝓈𝓉𝓇𝑒𝒶 𝑔𝒾𝑔𝒶𝓈", desc: 'El cultivo de la ostra japonesa se ha desarrollado con el apoyo de la UNA y otras instituciones.', img: "https://res.cloudinary.com/dmgz3csfp/image/upload/v1756027285/original_ecyv08.jpg" },
    { name: 'Molusco', name_cientific: "𝒜𝓃𝒶𝒹𝒶𝓇𝒶 𝓈𝓅", desc: 'Se menciona la investigación sobre el cultivo del molusco Anadara sp.', img: "https://res.cloudinary.com/dmgz3csfp/image/upload/v1756027320/piangua_g4uo6q.jpg" },
    { name: 'Mejillones', name_cientific: "𝑀𝓎𝓉𝒾𝓁𝒾𝒹𝒶𝑒", desc: 'Se ha manifestado el interés futuro en el cultivo de mejillones.', img: "https://res.cloudinary.com/dmgz3csfp/image/upload/v1756027357/mejillones_ci5qch.jpg" },
    { name: 'Camarón Blanco', name_cientific: "𝐿𝒾𝓉𝑜𝓅𝑒𝓃𝒶𝑒𝓊𝓈 𝓈𝑒𝓉𝒾𝒻𝑒𝓇𝓊𝓈", desc: 'Costa Rica importa larvas de camarón para la mayoría de su acuicultura desarrolló la tecnología base para la producción en masa de juveniles de camarón', img: "https://res.cloudinary.com/dmgz3csfp/image/upload/v1756027364/camaron_blanco_c0cynz.jpg" },
  ];

  return (
    <div>
      <h2 className="text-teal-600 text-xl font-bold mb-4">Especies en Cultivo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {especies.map((especie, index) => (
          <div
            key={index}
            className="rounded-lg p-4 shadow-sm bg-white flex flex-col items-start"
          >
            <div className="w-full h-32 bg-gray-200 mb-2 flex items-center justify-center rounded">
              {especie.img ? (<img src={especie.img} alt="" className='w-full h-full object-cover' />):(<span className=''>undefined</span>)}
            </div>
            <h3 className="font-semibold text-teal-600">{especie.name} </h3>
            <span className='font-light mb-1 text-teal-600'>({especie.name_cientific})</span>
            <p className="text-gray-700 text-sm">{especie.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
/* Malo */