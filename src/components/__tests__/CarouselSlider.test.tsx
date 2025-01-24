import { render, screen, fireEvent } from "@testing-library/react";
import { CarouselSlider } from "../CarouselSlider/CarouselSlider";

describe("CarouselSlider", () => {
	const mockImages = [
		{ id: "1", url: "test1.jpg", width: 100, height: 100 },
		{ id: "2", url: "test2.jpg", width: 100, height: 100 },
	];
	const mockOnLoadMore = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders images correctly", () => {
		render(<CarouselSlider images={mockImages} onLoadMore={mockOnLoadMore} loading={false} hasMore={true} />);

		// Due to image cloning, we expect double the number of images
		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(mockImages.length * 2);
	});

	it("shows loading spinner when loading", () => {
		render(<CarouselSlider images={mockImages} onLoadMore={mockOnLoadMore} loading={true} hasMore={true} />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("calls onLoadMore when scrolling near the end", () => {
		const { container } = render(<CarouselSlider images={mockImages} onLoadMore={mockOnLoadMore} loading={false} hasMore={true} />);

		const carouselContainer = container.querySelector(".carousel-container");
		if (carouselContainer) {
			// Mock scroll event
			Object.defineProperty(carouselContainer, "scrollLeft", { value: 1000 });
			Object.defineProperty(carouselContainer, "scrollWidth", { value: 1200 });
			Object.defineProperty(carouselContainer, "clientWidth", { value: 100 });

			fireEvent.scroll(carouselContainer);
			expect(mockOnLoadMore).toHaveBeenCalled();
		}
	});
});
