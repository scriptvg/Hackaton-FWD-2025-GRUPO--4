import React from "react";
import PropTypes from "prop-types";

export default function QuienesSomos({ title, description, img, alt }) {
  return (
    <section
      aria-labelledby="quienes-somos-heading"
      className="relative w-full h-[22rem] flex items-center justify-center bg-gray-400 text-white font-semibold overflow-hidden mb-10"
    >
      {/* Background image with reduced opacity for visual depth */}
      <img
        src={img}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      {/* Dark overlay to enhance text readability */}
      <div
        className="absolute inset-0 bg-black opacity-40"
        aria-hidden="true"
      ></div>

      {/* Foreground content with accessible heading and description */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h2
          id="quienes-somos-heading"
          className="text-3xl md:text-5xl font-bold text-white"
        >
          {title}
        </h2>
        <p className="text-base md:text-2xl mt-2 text-white">
          {description}
        </p>
      </div>
    </section>
  );
}

// Prop type validation for better developer experience
QuienesSomos.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
