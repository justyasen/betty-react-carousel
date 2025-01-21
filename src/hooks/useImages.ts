import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

interface ImageData {
  id: string;
  download_url: string;
  author: string;
}

const fetchImages = async (page: number, count: number): Promise<ImageData[]> => {
  const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${count}`);
  return response.data;
};

/**
 * 
 * @param count the number of images to load per page
 * @returns images from the picsum API
 */
const useImages = (count: number) => {
  const [images, setImages] = useState<string[]>([]); 
  const [page, setPage] = useState(1); 
  const [isLoading, setIsLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 

  const { data, error } = useQuery<ImageData[], Error>(
    ['images', page],
    () => fetchImages(page, count),
    {
      enabled: page > 1 || images.length === 0, 
      onSuccess: (newImages) => {
        if (newImages.length < count) {
          setHasMore(false); 
        }
        setImages((prevImages) => [...prevImages, ...newImages.map((image) => image.download_url)]);
      },
    }
  );

  useEffect(() => {
    if (isLoading && data) {
      setIsLoading(false);
    }
  }, [data]);

  const loadMoreImages = () => {
    if (!isLoading && hasMore) {
      setIsLoading(true);
      setPage((prevPage) => prevPage + 1); 
    }
  };

  return {
    images,
    isLoading,
    error: error?.message,
    loadMoreImages, 
    hasMore, 
  };
};

export default useImages;
