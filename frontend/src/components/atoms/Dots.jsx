import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Dots({ images, currentSlide, instanceRef }) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices for size adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation variants for dots
  const dotVariants = {
    inactive: {
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    active: {
      scale: 1.2,
      backgroundColor: "rgba(255, 255, 255, 1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    },
    hover: {
      scale: 1.3,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.9
    }
  };

  return (
    // Navigation container for the dots - más espacio en la parte inferior
    <motion.nav
      className="absolute bottom-6 xs:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 xs:gap-4 sm:gap-5 z-10"
      aria-label="Slide navigation"
      role="navigation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {images.map((_, idx) => {
        const isActive = currentSlide === idx;

        return (
          // Botones redondeados con mejor espaciado
          <motion.button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-full"
            aria-label={`Ir al slide ${idx + 1}${isActive ? ", slide actual" : ""}`}
            aria-current={isActive ? "true" : "false"}
            tabIndex={0}
            type="button"
            variants={dotVariants}
            initial="inactive"
            animate={isActive ? "active" : "inactive"}
            whileHover="hover"
            whileTap="tap"
            whileFocus="hover"
          >
            <motion.span 
              className="block rounded-full"
              style={{
                width: isMobile ? '12px' : '16px',
                height: isMobile ? '12px' : '16px'
              }}
            />
          </motion.button>
        );
      })}
    </motion.nav>
  );
}

export default Dots;