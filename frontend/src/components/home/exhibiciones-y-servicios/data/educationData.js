// src/components/educationData.js


const educationData = [
  {
    value: 'don-pulpo',
    label: 'Don Pulpo',
    title: 'Aprende con Don Pulpo',
    description: ['Enseñar a los niños sobre características distintivas de los pulpos mediante actividades.'],
    facts: [
      'Generalidades del pulpo.',
      'Dirigido para niños de 5 a 6 años.',
      'Máximo 10 a 15 personas.',
      'Tiempo:30 minutos.'
    ],
    images: ["https://res.cloudinary.com/dmgz3csfp/image/upload/v1756024859/pul_zlnweg.jpg", "https://res.cloudinary.com/dmgz3csfp/image/upload/v1756024922/Pulpo_zcrunw.jpg"],
    buttons: [
      { label: 'Inscribirse', link: '/inscripcion-don-pulpo' },
      { label: 'Ver Guía', link: '/guia-don-pulpo.pdf' }
    ],
  },
  {
    value: 'contaminacion-de-los-oceanos',
    label: 'Contaminación de los océanos',
    title: 'Insentivar la conciencia ambiental',
    description: ['Enseñar a los niños las consecuencias que traen los desechos sólidos en el océano al no estar clasificados'],
    facts: [
      'Animales y mamíferos marinos.',
      'Estratos del océano.',
      'Problemática que enfrentan las especies marinas.',
      'Contaminación de los océanos.',
      'Clasificación de los desechos sólidos.'
    ],
    images: ["https://res.cloudinary.com/dmgz3csfp/image/upload/v1756024962/conta2_qg8v4w.jpg", "https://res.cloudinary.com/dmgz3csfp/image/upload/v1755983220/contaminacion_1_hfclrl.jpg"],
    buttons: [
      { label: 'Inscribirse', link: '/inscripcion-contaminacion-de-los-oceanos' }
    ],
  },
  {
    value: 'que-paso-con-la-tortuga-julia',
    label: '¿Qué pasó con la Tortuga Julia?',
    title: 'Aprende con la Tortuga Julia',
    description: ['Enseñar a niños mediante imágenes y dramatización el ciclo de vida de la tortuga marina.'],
    facts: [
      'Ciclo de vida de las especies.',
      'Diferencias entre tortugas marinas de Costa Rica.',
      'Clasificación de los residuos.',
      'Formas de reutilizar algunos residuos valorizables.'
    ],
    images: ["https://res.cloudinary.com/dmgz3csfp/image/upload/v1756025130/julia_nzyehb.jpg", "https://res.cloudinary.com/dmgz3csfp/image/upload/v1756025143/Tjulia_kmgkvz.jpg"],
    buttons: [
      { label: 'Inscribirse', link: '/inscripcion-tortuga-julia' }
    ],
  },
  {
    value: 'monitoreo-de-residuos',
    label: 'Monitoreo de Residuos',
    title: 'Voluntariado de Monitoreo de Residuos',
    description: ['Analizar la contaminación frente a la playa frente al Parque Marino mediante un monitoreo al azar de residuos sólidos con el fin de generar conciencia ambiental.'],
    facts: [
      'Recolección de residuos sólidos en la playa.',
      'Clasificación valorización y no valorizables.',
      'Ciencia ciudadana.'
    ],
    images: ["https://res.cloudinary.com/dmgz3csfp/image/upload/v1756025231/monitoreo_szfver.jpg", "https://res.cloudinary.com/dmgz3csfp/image/upload/v1756025232/monitoreo_2_ctzgg2.jpg"],
    buttons: [
      { label: 'Inscribirse', link: '/inscripcion-monitoreo-de-residuos' }
    ],
  },
  {
    value: 'biologo-por-un-dia',
    label: 'Biólogo por un día',
    title: 'Aprende como ser biólogo',
    description: ['El objetivo de este taller es explicar la diferencia entre un vertebrado e invertebrado también de poder identificar tanto las partes externas como internas de las dos especies que se van a tomar como ejemplo para la disección, además explicar las funciones de las partes de estos animales'],
    facts: [
      'Diferencias entre vertebrados e invertebrados.',
      'Características generales de un pez.',
      'Disección de un atún y calamar.',
      'Características generales de un molusco.',
      'Enfermedades comunes de los peces.'
    ],
    images: ["https://res.cloudinary.com/dmgz3csfp/image/upload/v1756025316/massi_cnvx2s.jpg", "https://res.cloudinary.com/dmgz3csfp/image/upload/v1756025327/Pes_zibew5.jpg"],
    buttons: [
      { label: 'Solicitar Taller', link: '/solicitar-biologo' }
    ],
  },
];

export default educationData;
