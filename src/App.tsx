import React from "react";
import ImageCarousel from "./components/ImageCarousel/ImageCarousel";

const App: React.FC = () => {
	return (
		<div className="app-container">
			<div className="carousel-wrapper">
				<ImageCarousel />
			</div>
		</div>
	);
};

export default App;
