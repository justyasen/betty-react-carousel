import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";

// Mock the custom hook
jest.mock("../../hooks/useImageLoader", () => ({
	useImageLoader: jest.fn(),
}));

// Get the mocked hook
const mockUseImageLoader = jest.requireMock("../../hooks/useImageLoader").useImageLoader;

describe("ImageCarousel", () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});
	const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

	beforeEach(() => {
		jest.clearAllMocks();
		queryClient.clear();
	});

	it("shows loading state", () => {
		mockUseImageLoader.mockReturnValue({
			images: [],
			loading: true,
			error: null,
			hasMore: true,
			loadMore: jest.fn(),
		});

		render(<ImageCarousel />, { wrapper });
		expect(screen.getByText("Loading images...")).toBeInTheDocument();
	});

	it("shows error state", () => {
		mockUseImageLoader.mockReturnValue({
			images: [],
			loading: false,
			error: "Failed to load images",
			hasMore: false,
			loadMore: jest.fn(),
		});

		render(<ImageCarousel />, { wrapper });
		expect(screen.getByText("Failed to load images")).toBeInTheDocument();
	});

	it("renders carousel when images are loaded", () => {
		mockUseImageLoader.mockReturnValue({
			images: [{ id: "1", url: "test.jpg", width: 100, height: 100 }],
			loading: false,
			error: null,
			hasMore: true,
			loadMore: jest.fn(),
		});

		render(<ImageCarousel />, { wrapper });
		const images = screen.getAllByRole("img");
		expect(images.length).toBeGreaterThan(0);
		expect(images[0]).toBeInTheDocument();
	});
});
