// src/components/ThemeToggle.jsx
import React, { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { CiSun } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const buttonRef = useRef(null);

  // Evitar hidratación inconsistente entre servidor y cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Manejar teclado para mejor accesibilidad
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setDark((prev) => !prev);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-2">
      {/* Contenedor para el tooltip y el interruptor */}
      <div className="relative flex flex-col items-center">
        {/* Tooltip accesible */}
        <AnimatePresence>
          {(isHovered || isFocused) && (
            <motion.span
              id="theme-toggle-tooltip"
              role="tooltip"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute -top-9 mb-2 text-xxs font-medium bg-white dark:bg-gray-200 text-white dark:text-gray-800 px-2 py-1 rounded-md shadow-lg whitespace-nowrap"
            >
              {dark ? "Modo claro" : "Modo oscuro"}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          ref={buttonRef}
          type="button"
          role="switch"
          aria-checked={dark}
          aria-label={dark ? "Modo oscuro activado" : "Modo claro activado"}
          aria-describedby="theme-toggle-tooltip"
          title={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          onClick={() => setDark((prev) => !prev)}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileTap={{ scale: 0.95 }}
          className="
            relative
            w-16 h-8
            bg-gray-200 dark:bg-gray-700
            rounded-full
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
            shadow-md
            border border-gray-300 dark:border-gray-600
            flex items-center
            p-1
          "
        >
          {/* Thumb con icono */}
          <motion.span
            layout
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            className={`
              flex items-center justify-center
              w-6 h-6
              rounded-full
              shadow-md
              ${dark ? "bg-gradient-to-br from-blue-700 to-indigo-800" : "bg-gradient-to-br from-yellow-400 to-orange-400"}
              z-10
            `}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={dark ? "moon" : "sun"}
                initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
                aria-hidden="true"
              >
                {dark ? (
                  <div className="relative">
                    <IoMoonOutline className="w-4 h-4 text-white" />
                    {/* Detalles estelares para la luna */}
                    <div className="absolute -top-1 -right-1 w-1 h-1 rounded-full bg-white opacity-70"></div>
                  </div>
                ) : (
                  <div className="relative">
                    <CiSun className="w-5 h-5 text-white" />
                    {/* Rayos de sol */}
                    <div className="absolute -top-1 -left-1 w-1 h-1 rounded-full bg-white opacity-80"></div>
                    <div className="absolute -top-1 -right-1 w-1 h-1 rounded-full bg-white opacity-80"></div>
                    <div className="absolute -bottom-1 -left-1 w-1 h-1 rounded-full bg-white opacity-80"></div>
                    <div className="absolute -bottom-1 -right-1 w-1 h-1 rounded-full bg-white opacity-80"></div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.span>
          
          {/* Indicador visual de estado para usuarios con preferencia de movimiento reducido */}
          <span className="sr-only">
            {dark ? "Modo oscuro activado" : "Modo claro activado"}
          </span>
        </motion.button>
      </div>
    </div>
  );
}