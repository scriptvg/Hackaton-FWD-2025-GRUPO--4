import { MapPin, Mail, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import React, { useRef } from "react";

export default function ContactSection() {
  const nombre = useRef(null);
  const correo = useRef(null);
  const asunto = useRef(null);
  const mensaje = useRef(null);

  const enviar = () => {
    const Datos = {
      nombre: nombre.current.value,
      correo: correo.current.value,
      asunto: asunto.current.value,
      mensaje: mensaje.current.value,
    };

    emailjs
      .send("service_ke9gzcs", "template_cho3xqg", Datos, "3mQx8AVIUbbufg0BX")
      .then(
        () => alert("Mensaje enviado correctamente"),
        () => alert("Hubo un problema al enviar el mensaje")
      );
  };

  return (
    <section
      role="region"
      aria-label="Sección de contacto y ubicación"
      className="
        bg-[#f8f9fa] dark:bg-[var(--background)]
        py-20 px-4 transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2
          className="
            text-3xl md:text-4xl font-extrabold text-center uppercase
            text-[#202020] dark:text-[#F9FAFC]
          "
        >
          Ubicación y Contacto
        </h2>
        <div className="w-20 h-1 bg-[#1CB6B0] mx-auto my-4 rounded" />
        <p className="text-center text-[#202020] dark:text-[#F9FAFC] mb-10">
          Visítanos y descubre la maravilla de la biodiversidad marina de Costa Rica
        </p>

        {/* Grid: mapa + formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mapa y detalles */}
          <div
            className="
              bg-white dark:bg-[var(--card)]
              shadow-lg dark:shadow-none
              rounded-xl p-6 transition-colors duration-300
            "
          >
            <div className="rounded overflow-hidden mb-6">
              <iframe
                title="Mapa Parque Marino"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.4804406816743!2d-84.826716!3d9.977114000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa02eedbd317681%3A0x15f0d585edd74ae8!2sParque%20Marino%20del%20Pac%C3%ADfico!5e0!3m2!1ses-419!2scr!4v1748532098833!5m2!1ses-419!2scr"
                width="100%"
                height="250"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded"
              />
            </div>

            <div className="space-y-5 text-gray-800 dark:text-[#F9FAFC]">
              <div className="flex items-start gap-3">
                <MapPin className="dark:text-[#FF6900]  text-[#0D5E58] w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-bold text-lg text-[#202020] dark:text-[#F9FAFC]">
                    Ubicación
                  </h4>
                  <p className="text-sm text-[#202020] dark:text-[#F9FAFC]">
                    Puntarenas, Costa Rica
                  </p>
                  <p className="text-sm text-[#202020] dark:text-[#F9FAFC]">
                    A 100 metros del muelle principal
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="dark:text-[#FF6900]  text-[#0D5E58] w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-bold text-[#202020] text-lg dark:text-[#F9FAFC]">
                    Teléfono
                  </h4>
                  <p className="text-sm text-[#202020] dark:text-[#F9FAFC]">
                    +506 2661-5270
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="dark:text-[#FF6900]  text-[#0D5E58] w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-bold text-lg text-[#202020] dark:text-[#F9FAFC]">
                    Correo Electrónico
                  </h4>
                  <p className="text-sm text-[#202020] dark:text-[#F9FAFC]">
                    info@parquemarino.co.cr
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div
            className="
              bg-white dark:bg-[var(--card)]
              shadow-xl dark:shadow-none
              rounded-2xl p-8 transition-colors duration-300
            "
          >
            <h3 className="flex items-center gap-2 text-[#0D5E58] dark:text-[#FF6900] text-xl font-bold mb-6">
              <Mail className="w-5 h-5" aria-hidden="true" /> Envíanos un Mensaje
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                enviar();
              }}
              className="space-y-6"
              aria-label="Formulario de contacto"
            >
              {/* Nombre y correo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: "nombre", label: "Nombre", ref: nombre, type: "text" },
                  {
                    id: "correo",
                    label: "Correo Electrónico",
                    ref: correo,
                    type: "email",
                  },
                ].map(({ id, label, ref, type }) => (
                  <div key={id}>
                    <label
                      htmlFor={id}
                      className="block text-sm font-medium text-[#0D5E58] dark:text-[#F9FAFC] mb-1"
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      ref={ref}
                      required
                      className="
                        w-full px-4 py-3
                        rounded-md shadow-sm
                        bg-white dark:bg-[#F9FAFC]
                        text-[#0D5E58] dark:text-white
                        focus:outline-none focus:ring-2 focus:ring-[#0D5E58]
                        transition-colors duration-300
                        text-sm
                      "
                    />
                  </div>
                ))}
              </div>

              {/* Asunto */}
              <div>
                <label
                  htmlFor="asunto"
                  className="block text-sm font-medium text-[#0D5E58] dark:text-[var(--foreground)] mb-1"
                >
                  Asunto
                </label>
                <input
                  id="asunto"
                  type="text"
                  ref={asunto}
                  required
                  className="
                    w-full px-4 py-3
                    rounded-md shadow-sm
                    bg-white dark:bg-[#F9FAFC]
                    text-[#0D5E58] dark:text-gray-200
                    focus:outline-none focus:ring-2 focus:ring-[#0D5E58]
                    transition-colors duration-300
                    text-sm
                  "
                />
              </div>

              {/* Mensaje */}
              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-[#0D5E58] dark:text-[#F9FAFC] mb-1"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  rows="6"
                  ref={mensaje}
                  required
                  className="
                    w-full px-4 py-3
                    rounded-md shadow-sm
                    bg-white dark:bg-[#F9FAFC]
                    text-[#0D5E58] dark:text-gray-200
                    focus:outline-none focus:ring-2 focus:ring-[#0D5E58]
                    transition-colors duration-300
                    text-sm resize-none
                  "
                />
              </div>

              {/* Enviar */}
              <button
                type="submit"
                className="
                  w-full
                  bg-[#FF6900] hover:bg-orange-700
                  dark:bg-[#FF6900] dark:text-[#FF6900] dark:hover:bg-orange-400 dark:hover:text-[#FF6900]
                  text-white font-semibold py-3 rounded-md
                  flex items-center justify-center gap-2
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D5E58]
                "
                aria-label="Enviar mensaje"
              >
                Enviar Mensaje <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
