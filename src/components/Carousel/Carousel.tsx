import React, { useRef, useEffect } from 'react';
import './Carousel.css'; 
import useImages from '../../hooks/useImages';

const Carousel: React.FC = () => {
  const { images, isLoading, error, loadMoreImages, hasMore } = useImages(10); // Fetch 10 images per page
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      
      if (scrollLeft + clientWidth >= scrollWidth * 0.9) {
        if (hasMore && !isLoading) {
          loadMoreImages(); 
        }
      }
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => {
        carousel.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isLoading, hasMore]);

  if (isLoading && images.length === 0) return <div>Loading images...</div>;
  if (error) return <div>Error loading images: {error}</div>;

  return (
    <div style={{ position: 'relative' }}>
      <div
        className="carousel-container"
        ref={carouselRef}
        style={{ overflowX: 'scroll', whiteSpace: 'nowrap', cursor: isLoading ? 'wait' : 'grab' }}
      >
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`carousel-${index}`}
            style={{ display: 'inline-block', width: '100%', objectFit: 'cover' }}
          />
        ))}
        {isLoading && <div className="loading-spinner">Loading more...</div>}
      </div>
    </div>
  );
};

export default Carousel;
