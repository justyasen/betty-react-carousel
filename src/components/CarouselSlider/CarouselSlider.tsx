import React, { useRef, useState, useEffect, useCallback } from "react";
import "./CarouselSlider.css";
import { CarouselProps } from "../../types/types";

/**
 * CarouselSlider component that contains the logic for the carousel - infinite scroll, loading more images, and handling the scroll position
 * @param {CarouselProps} props - The props for the CarouselSlider component
 * @returns {JSX.Element}
 */
export const CarouselSlider: React.FC<CarouselProps> = ({ images, onLoadMore, loading, hasMore }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [clonedImages, setClonedImages] = useState(images);

	useEffect(() => {
		setClonedImages([...images, ...images]);
	}, [images]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		container.scrollLeft = container.scrollWidth / 4;
	}, [images]);

	const handleScroll = useCallback(() => {
		const container = containerRef.current;
		if (!container || loading) return;

		const { scrollLeft, scrollWidth, clientWidth } = container;
		const scrollEnd = scrollWidth - clientWidth;

		// Handle infinite scroll wrapping
		if (scrollLeft <= 0) {
			container.scrollLeft = scrollEnd / 2;
		} else if (scrollLeft >= scrollEnd) {
			container.scrollLeft = scrollEnd / 2;
		}

		// Load more when user scrolls past 75% of the content
		if (scrollLeft > scrollEnd * 0.75 && hasMore) {
			onLoadMore();
		}
	}, [loading, hasMore, onLoadMore]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		container.addEventListener("scroll", handleScroll);
		return () => container.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	return (
		<div className="carousel-container" ref={containerRef}>
			<div className="carousel-track">
				{clonedImages.map((image, index) => (
					<div className="image-container" key={`${image.id}-${index}`}>
						<img className="carousel-image" src={image.url} alt={""} width={image.width} height={image.height} loading="lazy" />
					</div>
				))}
				{loading && <div className="loading-spinner">Loading...</div>}
			</div>
		</div>
	);
};
