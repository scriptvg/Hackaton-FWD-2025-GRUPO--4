import { useKeenSlider } from "keen-slider/react";
import { useCallback, useEffect, useRef, useState } from "react";

const SLIDE_DURATION = 5000; // Duration per slide in ms

export function useCarousel(images) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(Array(images.length).fill(0));
  const [isPaused, setIsPaused] = useState(false);
  const [sliderLoaded, setSliderLoaded] = useState(false);

  const rafRef = useRef();
  const startTimeRef = useRef(null);

  // Dynamically enable loop only if enough slides are available
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: images.length > 2, // Prevent loop errors with small image sets
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setCurrentSlide(slider.track.details.rel);
      setSliderLoaded(true);
    },
  });

  // Animate progress bar and autoplay transition
  const animate = useCallback(
    (time) => {
      if (isPaused) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const percentage = Math.min(elapsed / SLIDE_DURATION, 1);

      // Update progress for each slide
      setProgress((prev) => {
        const updated = [...prev];
        for (let i = 0; i < images.length; i++) {
          updated[i] = i < currentSlide ? 1 : i === currentSlide ? percentage : 0;
        }
        return updated;
      });

      // Move to next slide when time is up
      if (percentage < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        const nextSlide = (currentSlide + 1) % images.length;
        instanceRef.current?.moveToIdx(nextSlide);
        startTimeRef.current = null;
      }
    },
    [currentSlide, isPaused, images.length]
  );

  // Start animation when slider is ready or slide changes
  useEffect(() => {
    if (!sliderLoaded) return;
    cancelAnimationFrame(rafRef.current);
    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [animate, sliderLoaded, currentSlide]);

  // Pause autoplay
  const handlePause = () => setIsPaused(true);

  // Resume autoplay
  const handleResume = () => setIsPaused(false);

  return {
    sliderRef,
    instanceRef,
    currentSlide,
    progress,
    handlePause,
    handleResume,
  };
}
