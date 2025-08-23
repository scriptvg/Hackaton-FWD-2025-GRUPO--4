import React, { useState, memo } from "react";

const faqs = [
  {
    pregunta: "¿Cómo puedo acceder a los informes financieros del parque?",
    respuesta:
      "Todos los informes están disponibles en la pestaña de Documentos, ordenados por año y tipo. Puedes verlos, descargarlos o compartirlos directamente desde la plataforma.",
  },
  {
    pregunta: "¿Con qué frecuencia se actualiza la información pública?",
    respuesta:
      "La información institucional se actualiza trimestralmente o cuando hay nuevas resoluciones, convenios o informes relevantes.",
  },
  {
    pregunta: "¿Puedo solicitar acceso a documentos no publicados?",
    respuesta:
      "Sí. Puedes hacer una solicitud formal mediante el formulario de esta sección. Evaluaremos tu petición de acuerdo con nuestras políticas de acceso a la información.",
  },
  {
    pregunta: "¿Qué requisitos debo cumplir para presentar una solicitud?",
    respuesta:
      "Debes completar todos los campos del formulario, justificar la necesidad del documento y proporcionar un medio de contacto.",
  },
];

const FaqItem = memo(function FaqItem({ id, pregunta, respuesta, isOpen, onToggle }) {
  const panelId = `faq-panel-${id}`;
  const btnId = `faq-btn-${id}`;

  return (
    <li className="py-4">
      <button
        id={btnId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full text-left font-semibold text-gray-800 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
      >
        {pregunta}
        <span aria-hidden="true" className="text-teal-600 text-xl">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={btnId}
          className="mt-2 text-sm text-gray-600 leading-relaxed"
        >
          {respuesta}
        </div>
      )}
    </li>
  );
});

export default function TabPreguntasYFormulario() {
  const [active, setActive] = useState(null);

  // form state
  const [values, setValues] = useState({
    nombre: "",
    email: "",
    motivo: "",
    descripcion: "",
  });
  const [errors, setErrors] = useState({});

  const toggle = (i) => setActive((prev) => (prev === i ? null : i));

  // simple email regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    }
    if (!values.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!emailPattern.test(values.email)) {
      newErrors.email = "Ingresa un correo válido.";
    }
    if (!values.motivo.trim()) {
      newErrors.motivo = "El motivo es obligatorio.";
    }
    if (!values.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      // focus first invalid field
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorField)?.focus();
    } else {
      // TODO: submit form
      console.log("Form submitted", values);
      // reset
      setValues({ nombre: "", email: "", motivo: "", descripcion: "" });
      setErrors({});
    }
  };

  return (
    <section className="p-6 bg-white rounded-xl shadow space-y-8 max-w-4xl mx-auto w-full">
      {/* Preguntas Frecuentes */}
      <section aria-labelledby="faq-heading">
        <header>
          <h2
            id="faq-heading"
            className="text-teal-600 font-bold text-sm mb-2"
          >
            Preguntas Frecuentes
          </h2>
        </header>
        <ul className="divide-y divide-gray-200">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              id={i}
              pregunta={faq.pregunta}
              respuesta={faq.respuesta}
              isOpen={active === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </ul>
      </section>

      {/* Formulario de Solicitud */}
      <section aria-labelledby="form-heading">
        <header>
          <h2
            id="form-heading"
            className="text-teal-600 font-bold text-sm mb-2"
          >
            Formulario de Solicitud de Información
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Completa este formulario para realizar una solicitud oficial de
            acceso a la información pública.
          </p>
        </header>

        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit}
        >
          {/* Nombre y Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.nombre}
                aria-describedby={errors.nombre ? "nombre-error" : undefined}
                className={`border rounded px-4 py-2 w-full focus:outline-none focus-visible:ring-2 ${
                  errors.nombre
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-gray-300 focus-visible:ring-teal-500"
                }`}
              />
              {errors.nombre && (
                <p
                  id="nombre-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.nombre}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`border rounded px-4 py-2 w-full focus:outline-none focus-visible:ring-2 ${
                  errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-gray-300 focus-visible:ring-teal-500"
                }`}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Motivo */}
          <div>
            <label
              htmlFor="motivo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Motivo de la solicitud
            </label>
            <input
              id="motivo"
              name="motivo"
              type="text"
              value={values.motivo}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.motivo}
              aria-describedby={errors.motivo ? "motivo-error" : undefined}
              className={`border rounded px-4 py-2 w-full focus:outline-none focus-visible:ring-2 ${
                errors.motivo
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-gray-300 focus-visible:ring-teal-500"
              }`}
            />
            {errors.motivo && (
              <p
                id="motivo-error"
                className="mt-1 text-sm text-red-600"
              >
                {errors.motivo}
              </p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descripción detallada de la información requerida
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows={4}
              value={values.descripcion}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.descripcion}
              aria-describedby={errors.descripcion ? "descripcion-error" : undefined}
              className={`border rounded px-4 py-2 w-full focus:outline-none focus-visible:ring-2 ${
                errors.descripcion
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-gray-300 focus-visible:ring-teal-500"
              }`}
            />
            {errors.descripcion && (
              <p
                id="descripcion-error"
                className="mt-1 text-sm text-red-600"
              >
                {errors.descripcion}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            Enviar solicitud
          </button>
        </form>
      </section>
    </section>
  );
}
