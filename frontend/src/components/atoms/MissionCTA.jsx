import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MissionCTA({ textos, links }) {
  return (
    <section
      aria-labelledby="mission-cta-heading"
      className="bg-teal-600 text-white rounded-md p-8 max-w-7xl mx-auto my-10 text-center"
    >
      {/* Main heading for screen readers and semantic clarity */}
      <h2 id="mission-cta-heading" className="sr-only">
        Mission Call to Action
      </h2>

      {/* Dynamic content blocks */}
      {textos.map((text, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-2xl font-bold mb-2">{text.title}</h3>
          <p className="text-sm">{text.text}</p>
        </div>
      ))}

      {/* CTA buttons */}
      <div className="flex justify-center flex-wrap gap-4 mt-6">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className="bg-white text-teal-600 font-semibold rounded-md px-4 py-2 hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={`Ir a ${link.label}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

// Prop type validation for clarity and safety
MissionCTA.propTypes = {
  textos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MissionCTA;
