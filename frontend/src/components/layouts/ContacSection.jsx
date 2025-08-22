import { MapPin, Mail, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import React, { useRef } from "react";

// Contact section with map, contact info, and email form
export default function ContactSection() {
  const nombre = useRef(null);
  const correo = useRef(null);
  const asunto = useRef(null);
  const mensaje = useRef(null);

  // Send email using EmailJS
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
        (response) => {
          console.log("Éxito:", response.status, response.text);
          alert("Mensaje enviado correctamente");
        },
        (error) => {
          console.error("Error:", error);
          alert("Hubo un problema al enviar el mensaje");
        }
      );
  };

  return (
    <section
      className="bg-[#f8f9fa] py-20 px-4"
      role="region"
      aria-label="Sección de contacto y ubicación"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 uppercase">
          Ubicación y Contacto
        </h2>
        <div className="w-20 h-1 bg-[#1CB6B0] mx-auto my-4 rounded"></div>
        <p className="text-center text-gray-600 mb-10">
          Visítanos y descubre la maravilla de la biodiversidad marina de Costa Rica
        </p>

        {/* Layout: map + contact form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map and contact details */}
          <div className="bg-white shadow-lg rounded-xl p-6">
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
              ></iframe>
            </div>

            {/* Contact info */}
            <div className="space-y-5 text-gray-800">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#1CB6B0] w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Ubicación</h4>
                  <p className="text-sm text-gray-600">Puntarenas, Costa Rica</p>
                  <p className="text-sm text-gray-400">A 100 metros del muelle principal</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-[#1CB6B0] w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Teléfono</h4>
                  <p className="text-sm text-gray-600">+506 2661-5270</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-[#1CB6B0] w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Correo Electrónico</h4>
                  <p className="text-sm text-gray-600">info@parquemarino.co.cr</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto mejorado */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
            <h3 className="text-[#1CB6B0] text-xl font-bold mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5" /> Envíanos un Mensaje
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                enviar();
              }}
              className="space-y-6"
              aria-label="Formulario de contacto"
            >
              {/* Nombre y Correo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    ref={nombre}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1CB6B0] text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    id="correo"
                    type="email"
                    ref={correo}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1CB6B0] text-sm"
                  />
                </div>
              </div>

              {/* Asunto */}
              <div>
                <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto
                </label>
                <input
                  id="asunto"
                  type="text"
                  ref={asunto}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1CB6B0] text-sm"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  rows="6"
                  ref={mensaje}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1CB6B0] text-sm resize-none"
                ></textarea>
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full bg-[#1CB6B0] hover:bg-[#139a95] text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1CB6B0]"
              >
                Enviar Mensaje <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
