import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Slide({ img, isActive }) {
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil para ajustar animaciones
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Variantes para animaciones de imagen
  const imageVariants = {
    hidden: {
      scale: 1.05,
    },
    visible: {
      scale: 1,
      transition: {
        duration: 1.8,
        ease: "easeOut"
      }
    }
  };

  // Variantes para animaciones de overlay
  const overlayVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  // Variantes simplificadas para contenido
  const contentVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        staggerChildren: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Variantes simplificadas para elementos individuales
  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(6px)"
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  // Variantes específicas para el botón
  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="keen-slider__slide relative h-full w-full overflow-hidden">
      {/* Contenedor de imagen con filtro de oscurecimiento */}
      <div className="relative h-full w-full">
        {/* Imagen de fondo con animación de zoom sutil y filtro de oscurecimiento */}
        <motion.img
          src={img.src}
          alt={img.alt || img.title}
          className="w-full h-full object-cover brightness-75" // Filtro de oscurecimiento
          loading="lazy"
          aria-hidden={!isActive}
          variants={imageVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
        />
      </div>

      {/* Overlay con mayor contraste para mejor legibilidad */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div 
              className="w-full bg-gradient-to-b from-black/40 via-black/30 to-black/70 pt-8 pb-10 px-4 md:px-6"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              aria-live="polite"
              aria-atomic="true"
            >
              <motion.div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-4">
                <motion.h2 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg"
                  variants={itemVariants}
                  tabIndex="0"
                >
                  {img.title}
                </motion.h2>
                
                <motion.p 
                  className="text-sm sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
                  variants={itemVariants}
                  tabIndex="0"
                >
                  {img.description}
                </motion.p>
                
                {img.cta && (
                  <motion.div 
                    variants={itemVariants}
                  >
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link
                        to={img.cta.link}
                        className="inline-block px-5 py-2 md:px-6 md:py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white text-sm md:text-base drop-shadow-lg"
                        aria-label={img.cta.label}
                      >
                        {img.cta.label}
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Slide;