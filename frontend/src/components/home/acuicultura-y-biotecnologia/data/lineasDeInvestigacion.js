// src/data/lineasDeInvestigacion.js

import { Leaf, Globe, Fish } from 'lucide-react';

export const lineasDeInvestigacion = [
  {
    nombre: 'Tortugas Marinas',
    descripcion: 'Monitoreo de poblaciones, patrones migratorios, éxito reproductivo y amenazas que enfrentan las tortugas marinas en Costa Rica.',
    icon: Leaf
  },
  {
    nombre: 'Arrecifes de Coral',
    descripcion: 'Estudio de la salud de los arrecifes, impactos del cambio climático y estrategias de restauración de ecosistemas coralinos.',
    icon: Globe
  },
  {
    nombre: 'Tiburones y Rayas',
    descripcion: 'Investigación sobre la ecología, comportamiento y conservación de tiburones y rayas en aguas costarricenses.',
    icon: Fish
  }
];

export const areas = [
   'Ecología y conservación de arrecifes de coral',
   'Biología y conservación de tortugas marinas',
   'Ecología de tiburones y rayas',
   'Monitoreo de ecosistemas costeros',
   'Impactos del cambio climático en ecosistemas marinos',
   'Contaminación marina y sus efectos en la biodiversidad'
]