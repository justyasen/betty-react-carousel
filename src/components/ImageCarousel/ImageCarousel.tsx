import React from "react";
import { CarouselSlider } from "../CarouselSlider/CarouselSlider";
import { useImageLoader } from "../../hooks/useImageLoader";
import "./ImageCarousel.css";

/**
 * ImageCarousel component that displays a carousel of images
 * @returns {JSX.Element}
 */
export const ImageCarousel: React.FC = () => {
	const { images, loading, error, hasMore, loadMore } = useImageLoader(30);

	if (error) return <p className="error-text">{error}</p>;
	if (images.length === 0 && loading) {
		return <p className="loading-text">Loading images...</p>;
	}

	return (
		<section className="carousel-section">
			<CarouselSlider images={images} onLoadMore={loadMore} loading={loading} hasMore={hasMore} />
		</section>
	);
};

export default ImageCarousel;
