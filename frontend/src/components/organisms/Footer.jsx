import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { PiTiktokLogo } from "react-icons/pi";
import { Link } from "react-router-dom";

// Social media links with accessible labels and hover colors
const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/parquemarinodelpacifico",
    icon: Facebook,
    color: "hover:text-blue-600",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/parque.marino.del.pacifico",
    icon: Instagram,
    color: "hover:text-pink-600",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@ParqueMarino",
    icon: Youtube,
    color: "hover:text-red-600",
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@parquemarinodelpacifico",
    icon: PiTiktokLogo,
    color: "hover:text-purple-800",
  },
];

export default function Footer() {
  return (
    <footer
      className="bg-[#0d5d59] text-white pt-16 pb-8 px-6"
      role="contentinfo"
      aria-label="Pie de página del Parque Marino"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-[#F9FAFC] pb-10">
        {/* Branding and mission */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="bg-[#202020] rounded-full w-14 h-14 flex items-center justify-center"
              aria-hidden="true"
            >
              <img
                src={"https://res.cloudinary.com/dmgz3csfp/image/upload/v1755838267/LOGO_mg0gie.webp"}
                width={56}
                height={56}
                alt="Logotipo del Parque Marino"
                className="rounded-full object-contain"
              />
            </div>
            <h4 className="text-xl font-bold tracking-tight">
              Parque Marino
            </h4>
          </div>
          <p className="text-sm text-[#F9FAFC] mb-5 leading-relaxed">
            Conservamos la biodiversidad marina de Costa Rica mediante
            educación, investigación y conservación.
          </p>
          <nav
            aria-label="Redes sociales"
            className="flex gap-4 text-white/80"
          >
            {socialLinks.map(({ name, url, icon: Icon, color }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl ${color} transition-colors duration-300`}
                aria-label={`Visitar ${name}`}
              >
                <Icon />
              </a>
            ))}
          </nav>
        </div>

        {/* Quick links */}
        <div>
          <h5 className="text-lg font-semibold mb-4 border-b border-[#F9FAFC] pb-1 w-fit">
            Enlaces rápidos
          </h5>
          <ul className="space-y-2 text-sm text-[#F9FAFC]">
            {[
              ["Exhibiciones", "/exhibiciones-y-servicios/exhibiciones"],
              [
                "Servicios Educativos",
                "/exhibiciones-y-servicios/servicios-educativos",
              ],
              [
                "Centro de Rescate",
                "/investigacion-y-conservacion/centro-de-rescate-y-rehabilitacion",
              ],
              ["Donar", "/apoyo/donaciones"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  target="_blank"
                  to={href}
                  className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Opening hours */}
        <div>
          <h5 className="text-lg font-semibold mb-4 border-b border-[#F9FAFC] pb-1 w-fit">
            Horario
          </h5>
          <ul className="text-sm text-[#F9FAFC] space-y-1">
            {[
              ["Lunes", "Cerrado", "text-[#F9FAFC]"],
              ["Martes - Viernes", "9:00 - 16:30"],
              ["Sábado - Domingo", "9:00 - 16:30"],
              ["Feriados", "Consultar"],
            ].map(([day, hours, extraClass]) => (
              <li key={day} className="flex justify-between">
                <span>{day}</span>
                <span className={extraClass || ""}>{hours}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact information */}
        <div>
          <h5 className="text-lg font-semibold mb-4 border-b border-[#F9FAFC] pb-1 w-fit">
            Contacto
          </h5>
          <ul className="text-sm text-[#F9FAFC] space-y-3">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1 text-[#F9FAFC]" />
              <span>Puntarenas, Costa Rica</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-1 text-[#F9FAFC]" />
              <span>+506 2661-5270</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-1 text-[#F9FAFC]" />
              <a
                href="mailto:info@parquemarino.org"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-white"
              >
                info@parquemarino.org
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-xs text-[#F9FAFC] gap-4">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Parque Marino del Pacífico Central.
          Todos los derechos reservados.
        </p>
        <nav className="flex gap-4" aria-label="Legal">
          <Link
            to="/privacidad/politica-de-privicidad"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-white"
            target="_blank"
          >
            Política de Privacidad
          </Link>
          <Link
            to="/terminos-y-condiciones/terminos"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-white"
            target="_blank"
          >
            Términos y Condiciones
          </Link>
        </nav>
      </div>
    </footer>
  );
}
