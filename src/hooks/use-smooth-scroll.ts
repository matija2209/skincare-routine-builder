import { useRef } from 'react';

export const useSmoothScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previousStepRef = useRef<number | null>(null);

  const scrollToTop = () => {
    // Use window scrolling as a fallback
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // If scroll container exists, try scrolling within it
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleStepChange = (currentStep: number) => {
    if (previousStepRef.current !== currentStep) {
      // Slight delay to ensure DOM updates
      setTimeout(() => {
        scrollToTop();
      }, 50);
      previousStepRef.current = currentStep;
    }
  };

  return {
    scrollContainerRef,
    handleStepChange,
    scrollToTop  // Expose for manual use if needed
  };
}; 