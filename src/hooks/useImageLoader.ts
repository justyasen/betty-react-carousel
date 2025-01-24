import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { ProcessedImage, ImageResponse } from "../types/types";

/**
 * useImageLoader hook that fetches images from the Picsum API and returns the images, loading state, error state, and a function to load more images
 * @param {number} pageSize - The number of images to fetch per page
 * @returns {Object} - An object containing the images, loading state, error state, and a function to load more images
 */
export const useImageLoader = (pageSize: number = 20) => {
	const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useInfiniteQuery({
		queryKey: ["images", pageSize],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await axios.get<ImageResponse[]>(`https://picsum.photos/v2/list?page=${pageParam}&limit=${pageSize}`);

			return data.map(
				(item: ImageResponse): ProcessedImage => ({
					id: item.id,
					url: `https://picsum.photos/id/${item.id}/${item.width}/${item.height}`,
					width: item.width,
					height: item.height,
				})
			);
		},
		getNextPageParam: (lastPage: ProcessedImage[], allPages: ProcessedImage[][]) => (lastPage.length === pageSize ? allPages.length + 1 : undefined),
	});

	const images = data?.pages.flat() ?? [];

	return {
		images,
		loading: isLoading,
		error: isError ? (error as Error).message : null,
		hasMore: !!hasNextPage,
		loadMore: fetchNextPage,
	};
};
