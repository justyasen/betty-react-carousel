import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useImageLoader } from "../useImageLoader";

// Mock axios module
jest.mock("axios", () => ({
	__esModule: true,
	default: {
		get: jest.fn(),
	},
}));

// Get the mocked axios
const mockedAxios = jest.requireMock("axios").default;

describe("useImageLoader", () => {
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

	it("fetches and processes images correctly", async () => {
		const mockApiResponse = [{ id: "1", width: 100, height: 100, author: "test", url: "test.jpg", download_url: "test.jpg" }];

		mockedAxios.get.mockResolvedValueOnce({ data: mockApiResponse });

		const { result } = renderHook(() => useImageLoader(20), { wrapper });

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.images).toHaveLength(1);
		expect(result.current.images[0]).toEqual({
			id: "1",
			url: expect.stringContaining("picsum.photos/id/1"),
			width: 100,
			height: 100,
		});
	});

	it("handles errors correctly", async () => {
		mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

		const { result } = renderHook(() => useImageLoader(20), { wrapper });

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.error).toBe("Network error");
	});
});
