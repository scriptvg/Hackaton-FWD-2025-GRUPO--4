import { memo } from "react";
import TransparenciaHero from "@components/organisms/TransparenciaHero";
import ExhibitIntro from "@components/home/exhibiciones-y-servicios/components/ExhibitIntro";
import TabsContainer from "@components/atoms/TabsContainer";
import TabFinanzas from "@components/molecules/TransparenciaTabs";
import TabOrganigramaTestimonios from "@components/molecules/TabOrganigramaTestimonios";
import TabCertificaciones from "@components/molecules/TabCertificaciones";
import TabPreguntasYFormulario from "@components/molecules/TabPreguntasYFormulario";
import TabDocumentos from "@components/molecules/TabDocumentos";
import TabPoliticas from "@components/molecules/TabPoliticas";
import TabInformes from "@components/molecules/TabInformes";
import bgImage from "@assets/placeholder.svg";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { RiBookShelfLine } from "react-icons/ri";

// 🔑 Definimos las tabs fuera del componente para evitar recrearlas
const TransparenciaTabs = [
  {
    value: "info-financiera",
    label: "Información Financiera",
    component: <TabFinanzas />
  },
  {
    value: "info-y-memoria",
    label: "Informes y Memorias",
    component: <TabInformes />
  },
  {
    value: "organigrama",
    label: "Organigrama y Testimonios",
    component: <TabOrganigramaTestimonios />
  },
  {
    value: "politicas",
    label: "Políticas Institucionales",
    component: <TabPoliticas />
  },
  {
    value: "documentos",
    label: "Centro de Documentación",
    component: <TabDocumentos />
  },
  {
    value: "certificaciones",
    label: "Certificaciones",
    component: <TabCertificaciones />
  },
  {
    value: "preguntas",
    label: "Preguntas Frecuentes y Solicitudes",
    component: <TabPreguntasYFormulario />
  }
];

function Transparencia_Institucional() {
  return (
    <div className="mt-24" role="region" aria-labelledby="transparencia-heading">
      <TransparenciaHero
        title="Transparencia"
        subtitle="Comprometidos con la rendición de cuentas y la gestión responsable"
        bgImage={bgImage}
        buttons={[
          {
            text: "Descargar informes",
            onClick: () => alert("Descargando..."),
            primary: true,
          },
          {
            text: "Solicitar Información",
            onClick: () => alert("Abriendo formulario..."),
          },
          {
            text: "Suscribirse a Actualizaciones",
            onClick: () => alert("Suscripción completada."),
          },
        ]}
        cards={[
          {
            title: "Documentos",
            description: "Informes legales y administrativos.",
            icon: <MdOutlineDocumentScanner />
          },
          {
            title: "Transparencia",
            description: "Datos abiertos y rendición de cuentas.",
            icon: <HiOutlineDocumentSearch />
          },
          {
            title: "Auditorías",
            description: "Resultados de auditorías internas y externas.",
            icon: <VscGraph />,
          },
          {
            title: "Índice de Información",
            description: "Accede al índice completo de documentos.",
            icon: <RiBookShelfLine />,
          },
        ]}
      />

      <ExhibitIntro
        title="Transparencia Institucional"
        description="En el Parque Marino Central del Pacifico Sur estamos comprometidos con la transparencia y la rendición de cuentas. Creemos que es fundamental que nuestros donantes, colaboradores y el público en general tengan acceso a información clara sobre nuestra gestión financiera, administrativa y operativa."
      />

      {/* 🔑 Tabs accesibles */}
      <TabsContainer 
        tabs={TransparenciaTabs} 
        aria-label="Secciones de transparencia institucional"
      />
    </div>
  );
}

export default memo(Transparencia_Institucional);
