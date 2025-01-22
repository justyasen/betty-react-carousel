import React, { useCallback, useEffect, useRef, useState } from 'react';
import useImages from '../../hooks/useImages';
import './Carousel.css';

const Carousel: React.FC = () => {
  const { images, isLoading, error, loadMoreImages, hasMore } = useImages(10); // Fetch 10 images per page
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isScrollLoading, setIsScrollLoading] = useState(false);

  const handleScroll = useCallback(() => {
    if (carouselRef.current && !isScrollLoading) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      // Trigger load more images when the user reaches 80% of the scroll width
      if (scrollLeft + clientWidth >= scrollWidth * 0.8 && hasMore && !isLoading) {
        setIsScrollLoading(true); // Prevent duplicate loading
        loadMoreImages();
      }
      
      // Ensure the carousel scrolls back to the start (infinite scroll)
      if (scrollLeft === scrollWidth - clientWidth) {
        if (carouselRef.current) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    }
  }, [isScrollLoading, hasMore, isLoading, loadMoreImages]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      // Throttle the scroll event handler to prevent unwanted events
      const throttledScroll = () => {
        if (!isLoading && !isScrollLoading) {
          handleScroll();
        }
      };

      carousel.addEventListener('scroll', throttledScroll);
      return () => {
        carousel.removeEventListener('scroll', throttledScroll);
      };
    }
  }, [handleScroll, isLoading, isScrollLoading]);

  useEffect(() => {
    // Reset loading state once images are loaded
    if (!isLoading) {
      setIsScrollLoading(false);
    }
  }, [isLoading]);

  if (error) return <div>Error loading images: {error}</div>;

  return (
    <div className="carousel-wrapper">
      <div
        className={`carousel-container ${isLoading ? 'loading' : ''}`}
        ref={carouselRef}
      >
        {images.map((url, index) => (
          <div key={index} className="carousel-image-container">
            <img src={url} alt={`carousel-${index}`} />
          </div>
        ))}
        {isLoading && (
          <div className="loading-spinner">
            <span>Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
