import React from 'react'
import QuienesSomos from '../components/molecules/QuienesSomos'
import AboutSection from '../components/layouts/AboutSection'
import ExhibitIntro from '../components/home/exhibiciones-y-servicios/components/ExhibitIntro'
import OurApproach from '../components/atoms/DescriptionSection'
import TabsContainer from '../components/atoms/TabsContainer'
import SuccessCases from '../components/atoms/SuccessCases'
import CallToAction from '../components/atoms/CallToAction'
import CultivoTab from '../components/molecules/CultivoTab'
import TecnologiaTab from '../components/home/acuicultura-y-biotecnologia/components/tabs/TecnologiaTab'
import ExtensionTab from '../components/home/acuicultura-y-biotecnologia/components/tabs/ExtensionTab'
import ProyectosTab from '../components/molecules/ProyectosTab'
import { Link } from 'react-router-dom'
import InvestigationTabs from '../components/molecules/InvestigacionTab'
/* import { lineasDeInvestigacion, areas } from './data/lineasDeInvestigacion'; */
import { proyectos } from '../components/home/acuicultura-y-biotecnologia/data/proyectosData.js';
import { publicaciones, publicacionesStats  } from '../components/home/acuicultura-y-biotecnologia/data/publicacionesData.js';
import { colaboradores, redes  } from '../components/home/acuicultura-y-biotecnologia/data/colaboradoresData.js';
import PublicacionesTab from '../components/molecules/PublicacionesTab';
import ColaboracionesTab from '../components/molecules/ColaboracionesTab';
import GranjasTab from '../components/molecules/GranjasTab.jsx'

function AcuiculturaBiotecnologia() {

  const paragraphs = [
    "La acuicultura es crucial en Costa Rica, donde solo el 2% de los productos marinos consumidos provienen del cultivo, a pesar de que la producción acuícola representa cerca del 50% de la pesca mundial. El trabajo del Parque Marino en biotecnología y acuicultura busca cerrar esta brecha, ofreciendo una alternativa viable y sostenible a la pesca extractiva y contribuyendo a la seguridad alimentaria y al desarrollo económico de las comunidades costeras.", "El Parque Marino del Pacífico, a través de su LABM, se ha consolidado como un referente en acuicultura marina, educación y conservación en Costa Rica, promoviendo la investigación y la transferencia de tecnología para un aprovechamiento sostenible de los recursos marinos."
  ];

  const workAreas = [
    "Promoción de la Acuicultura Marina",
    "Investigación y Desarrollo (I+D)",
    "Producción de Organismos Marinos",
    "Cultivo Larval y de Juveniles",
    "Extensión y Transferencia Tecnológica",
    "Conservación y Educación Ambiental",
    "Capacitación y Formación Académica",
    "Incidencia en Políticas Públicas"
  ];

  const handleButtonClick = () => {
    alert('Botón "Conocer Más" clickeado!');
  };

  const acuiculturaTabs = [
    {
      value: "cultivo",
      label: "Especies en Cultivo",
      component: <CultivoTab />
    },
    {
      value: "tecnologia",
      label: "Tecnología e Innovación",
      component: <TecnologiaTab />
    },
    {
      value: "proyectos-actuales",
      label: "Proyectos Actuales",
      component: <ProyectosTab proyectos={proyectos} />
    },
    {
     value: "granjas",
     label: "Granjas",
     component: <GranjasTab />
    },
    {
      value: "colaboraciones",
      label: "Colaboraciones",
      component: <ColaboracionesTab colaboradores={colaboradores} redes={redes} />
    },
    {
      value: "publicaciones",
      label: "Publicaciones",
      component: <PublicacionesTab publicaciones={publicaciones} stats={publicacionesStats} />
    },
  ];

  return (
    <div className='flex flex-col items-center mt-23'>
      <QuienesSomos title={"Acuicultura y Biotecnologia"} description={"Descubre la biodiversidad de Costa Rica "} img={"https://res.cloudinary.com/dmgz3csfp/image/upload/v1756024318/fotos.verticales__1_awghmi.jpg"} />
      <ExhibitIntro description={"El Parque Marino del Pacífico cuenta con un Laboratorio de Acuicultura y Biotecnología Marina (LABM) que es fundamental para su misión de sostenibilidad de los recursos marino-costeros. Este laboratorio no es solo un espacio de investigación, sino que tiene un fuerte componente de extensión y transferencia tecnológica hacia las comunidades costeras de Costa Rica."} title={"Programa de Acuicultura y Biotecnología"} />
      <div className=''>
        <OurApproach title={"Nuestro Enfoque"} paragraphs={paragraphs} imageSrc={"https://res.cloudinary.com/dmgz3csfp/image/upload/v1756024318/fotos.verticales__1_awghmi.jpg"} workAreasTitle={"Áreas de Trabajo:"} workAreas={workAreas} buttonText={"Conocer más"} onButtonClick={handleButtonClick} imageAlt={"Img del programa"}  />
      
      
        <TabsContainer tabs={acuiculturaTabs} defaultValue="cultivo" />
      </div>
      <SuccessCases />
      <CallToAction />
    </div>
  )
}

export default AcuiculturaBiotecnologia
