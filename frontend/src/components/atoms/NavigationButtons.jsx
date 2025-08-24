import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";


/**
 * Renders navigation buttons for a carousel with enhanced animations and accessibility.
 * Allows users to move to the previous or next slide.
 * Includes smooth animations, better accessibility features, and visual feedback.
 */
function NavigationButtons({ instanceRef }) {
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

  // Animation variants for buttons
  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 0.7,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      opacity: 1,
      scale: 1.1,
      backgroundColor: "rgb(42, 181, 176)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  // Icon animation variants
  const iconVariants = {
    rest: {
      x: 0,
      transition: {
        duration: 0.2
      }
    },
    hover: {
      x: -3,
      transition: {
        duration: 0.2
      }
    }
  };

  const iconVariantsRight = {
    rest: {
      x: 0,
      transition: {
        duration: 0.2
      }
    },
    hover: {
      x: 3,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      {/* Previous slide button */}
      <motion.button
        onClick={() => instanceRef.current?.prev()}
        className="absolute top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#2ab5b0]   z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2ab5b0]"
        aria-label="Go to previous slide"
        type="button"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        whileFocus="hover"
        style={{
          left: isMobile ? '8px' : '16px',
          width: isMobile ? '36px' : '44px',
          height: isMobile ? '36px' : '44px'
        }}
      >
        <motion.div
          variants={iconVariants}
          initial="rest"
          whileHover="hover"
        >
          <ChevronLeftIcon 
            width={isMobile ? 20 : 24} 
            height={isMobile ? 20 : 24} 
          />
        </motion.div>
      </motion.button>

      {/* Next slide button */}
      <motion.button
        onClick={() => instanceRef.current?.next()}
        className="absolute top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#2ab5b0]    z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2ab5b0]"
        aria-label="Go to next slide"
        type="button"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        whileFocus="hover"
        style={{
          right: isMobile ? '8px' : '16px',
          width: isMobile ? '36px' : '44px',
          height: isMobile ? '36px' : '44px'
        }}
      >
        <motion.div
          variants={iconVariantsRight}
          initial="rest"
          whileHover="hover"
        >
          <ChevronRightIcon 
            width={isMobile ? 20 : 24} 
            height={isMobile ? 20 : 24} 
          />
        </motion.div>
      </motion.button>
    </>
  );
}

export default NavigationButtons;