export interface ImageResponse {
	id: string;
	author: string;
	width: number;
	height: number;
	url: string;
	download_url: string;
}

export interface ProcessedImage {
	id: string;
	url: string;
	width: number;
	height: number;
}

export interface CarouselProps {
	images: ProcessedImage[];
	onLoadMore: () => void;
	loading: boolean;
	hasMore: boolean;
}
