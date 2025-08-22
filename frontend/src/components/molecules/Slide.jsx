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

  // Variantes para animaciones de contenido
  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <div className="keen-slider__slide relative h-full w-full overflow-hidden">
      {/* Imagen de fondo sin blur */}
      <img
        src={img.src}
        alt={img.alt || img.title}
        className="w-full h-full object-cover"
        loading="lazy"
        aria-hidden={!isActive}
      />

      {/* Overlay con animación mejorada */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute inset-0 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-full bg-gradient-to-t from-black/85 via-black/50 to-transparent pt-16 md:pt-24 pb-6 md:pb-10 px-4 md:px-6"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              aria-live="polite"
              aria-atomic="true"
            >
              <motion.div className="max-w-3xl mx-auto text-center space-y-2 md:space-y-4 text-white">
                <motion.h2 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
                  variants={itemVariants}
                  tabIndex="0"
                >
                  {img.title}
                </motion.h2>
                
                <motion.p 
                  className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto"
                  variants={itemVariants}
                  tabIndex="0"
                >
                  {img.description}
                </motion.p>
                
                {img.cta && (
                  <motion.div 
                    className="pt-2 md:pt-4"
                    variants={itemVariants}
                  >
                    <Link
                      to={img.cta.link}
                      className="inline-block px-5 py-2 md:px-6 md:py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white text-sm md:text-base"
                      aria-label={img.cta.label}
                    >
                      {img.cta.label}
                    </Link>
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