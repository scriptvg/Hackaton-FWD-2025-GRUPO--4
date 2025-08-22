import { useState, useEffect } from "react";
import { useCarousel } from "../../hooks/useCarousel";
import images from "../data/imgs";
import Slide from "../molecules/Slide";
import NavigationButtons from "../atoms/NavigationButtons";
import Dots from "../atoms/Dots/";

function Carousel() {
  const {
    sliderRef,
    instanceRef,
    currentSlide,
    handlePause,
    handleResume,
  } = useCarousel(images);

  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Detect slide direction when carousel changes
  useEffect(() => {
    const slider = instanceRef.current;
    if (!slider) return;

    // Detect slide direction change (used for emotional animation flow)
    const onSlideChanged = (event) => {
      const newDirection = event?.details?.direction ?? 0;
      setDirection(newDirection);
    };

   slider.on("slideChanged", onSlideChanged);

  // No need to manually remove listener if Keen handles cleanup
  return () => {
    // Optional: reset direction or autoplay state if needed
    setDirection(0);
};
  }, [instanceRef]);

  // Enable keyboard navigation (← / →)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        instanceRef.current?.next();
        setDirection(1);
      } else if (e.key === "ArrowLeft") {
        instanceRef.current?.prev();
        setDirection(-1);
      }
    };


    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [instanceRef]);

  // Pause autoplay and update state
  const enhancedHandlePause = () => {
    handlePause();
    setIsAutoPlaying(false);
  };

  // Resume autoplay and update state
  const enhancedHandleResume = () => {
    handleResume();
    setIsAutoPlaying(true);
  };

  return (
    <section
      className="relative mx-auto overflow-hidden mt-24 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[560px] max-w-screen-xl"
      onMouseEnter={enhancedHandlePause}
      onMouseLeave={enhancedHandleResume}
      onFocus={enhancedHandlePause}
      onBlur={enhancedHandleResume}
      role="region"
      aria-label="Image carousel"
      tabIndex={0} // Enables keyboard focus
    >
      {/* Live region for screen readers */}
      <div aria-live="polite" className="sr-only">
        {`Slide ${currentSlide + 1} of ${images.length}`}
      </div>

      {/* Slide container */}
      <div ref={sliderRef} className="keen-slider h-full">
        {images.map((img, index) => (
          <Slide
            key={index}
            img={img}
            isActive={index === currentSlide}
            direction={direction}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <NavigationButtons
        instanceRef={instanceRef}
        direction={direction}
        setDirection={setDirection}
      />

      {/* Dot navigation */}
      <Dots
        images={images}
        currentSlide={currentSlide}
        instanceRef={instanceRef}
        setDirection={setDirection}
      />

      {/* Autoplay toggle button */}
      <button
        onClick={isAutoPlaying ? enhancedHandlePause : enhancedHandleResume}
        className="absolute top-4 right-4 z-10 bg-white px-3 py-1 rounded shadow text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={isAutoPlaying ? "Pause carousel" : "Resume carousel"}
      >
        {isAutoPlaying ? "Pause" : "Play"}
      </button>
    </section>
  );
}

export default Carousel;
