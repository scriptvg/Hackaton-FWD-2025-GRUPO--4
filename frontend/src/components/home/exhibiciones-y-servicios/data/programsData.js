import Cocodrilo from '../../../../assets/img/Figuras_turismo/Figura_turismo_1.jpg';
import IslaDelCoco from '../../../../assets/img/Figuras_turismo/Figura_turismo_4.jpg';
import Acuario from '../../../../assets/img/Figuras_turismo/Figura_turismo_7.jpeg';
import Raya from '../../../../assets/img/Figuras_turismo/Figura_turismo_9.jpg';
import Tortuga_M from '../../../../assets/img/Figuras_turismo/Figura_turismo_11.jpg';
import Tiburon from '../../../../assets/img/Figuras_turismo/Figura_turismo_13.jpg';

const programsData = [
  {
    id: 1,
    title: 'Programa de Reptiles',
    description: 'Descubre el fascinante mundo de los reptiles y su importancia en el ecosistema',
    image: Cocodrilo,
    items: [
      { id: 1, text: 'Conoce las especies de cocodrilos y caimanes' },
      { id: 2, text: 'Aprende sobre la tenencia responsable de animales silvestres' },
      { id: 3, text: 'Participa en talleres de conservación' }
    ]
  },
  {
    id: 2,
    title: 'Explorando Isla del Coco',
    description: 'Vive una experiencia única en nuestra exhibición de la Isla del Coco',
    image: IslaDelCoco,
    items: [
      { id: 1, text: 'Observa la maqueta interactiva de la isla' },
      { id: 2, text: 'Descubre la biodiversidad del Parque Nacional' },
      { id: 3, text: 'Visualiza nuestro video inmersivo' }
    ]
  },
  {
    id: 3,
    title: 'Acuario Marino',
    description: 'Explora la vida marina en nuestras instalaciones',
    image: Acuario,
    items: [
      { id: 1, text: 'Observa más de 20 peceras con especies del Pacífico' },
      { id: 2, text: 'Conoce la pecera de agua salada más grande de Costa Rica' },
      { id: 3, text: 'Participa en charlas sobre conservación marina' }
    ]
  },
  {
    id: 4,
    title: 'Rayas y Mantarrayas',
    description: 'Conoce estas asombrosas criaturas marinas de cerca',
    image: Raya,
    items: [
      { id: 1, text: 'Diferencia entre rayas y mantarrayas' },
      { id: 2, text: 'Observa su comportamiento en el agua' },
      { id: 3, text: 'Aprende sobre su importancia ecológica' }
    ]
  },
  {
    id: 5,
    title: 'Tortugas Marinas',
    description: 'Descubre las tortugas marinas y cómo protegerlas',
    image: Tortuga_M,
    items: [
      { id: 1, text: 'Conoce las diferentes especies de tortugas' },
      { id: 2, text: 'Aprende sobre su ciclo de vida' },
      { id: 3, text: 'Participa en programas de conservación' }
    ]
  },
  {
    id: 6,
    title: 'Tiburones Nodrizas',
    description: 'Conoce más sobre los tiburones Nodriza junto a nosotros',
    image: Tiburon,
    items: [
      { id: 1, text: 'Descubre las características del Tiburón gata nodriza' },
      { id: 2, text: 'Aprende sobre su comportamiento tranquilo' },
      { id: 3, text: 'Conoce su hábitat natural' }
    ]
  }
];

export default programsData;
