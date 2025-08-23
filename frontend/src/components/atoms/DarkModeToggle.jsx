// src/components/ThemeToggle.jsx
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { CiSun } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Evitar hidratación inconsistente entre servidor y cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-2">
      {/* Contenedor para el tooltip y el interruptor */}
      <div className="relative flex flex-col items-center">
        {/* Tooltip que aparece al pasar el mouse - ahora posicionado absolutamente arriba */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute -top-8 mb-2 text-xs font-medium bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 rounded-md shadow-lg whitespace-nowrap"
            >
              {dark ? "Modo claro" : "Modo oscuro"}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          role="switch"
          aria-checked={dark}
          aria-label={dark ? "Desactivar modo oscuro" : "Activar modo oscuro"}
          title={dark ? "Modo oscuro activado" : "Modo claro activado"}
          onClick={() => setDark((prev) => !prev)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileTap={{ scale: 0.95 }}
          className="
            relative
            w-16 h-8
            bg-white
            rounded-full
            transition-all duration-300
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
            shadow-md
            border border-gray-200
            flex items-center
            p-1
          "
        >
          {/* Thumb con icono - más grande */}
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
              ${dark ? "bg-blue-800" : "bg-gray-200"}
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
              >
                {dark ? (
                  <IoMoonOutline className="w-4 h-4 text-white" />
                ) : (
                  <CiSun className="w-4 h-4 text-yellow-500" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}