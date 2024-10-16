import { useEffect, useState } from 'react';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import baseURL from '@/config/axiosData';
import { useParams } from 'react-router-dom';
import { parseImageData } from '@/helpers/parseData';
import { ImagesData } from '@/interfaces/imagesData';
import ShowAllImages from '@/components/ShowData/ShowAllImages';

export const GetAllImages = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allImages, setAllImages] = useState<ImagesData[]>([])

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        const [imagesResponse] = await Promise.all([
          baseURL.get(`/images?placeId=${placeId}`, { headers: { Authorization: token } })
        ]);
        let parsedImages = parseImageData(imagesResponse.data);
        setAllImages(parsedImages)

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [placeId]);


  return (
    <>
      <Spinner show={isLoading} />
      {allImages && allImages.map((image) => (
        <ShowAllImages
          key={image.id}
          imageName={image.imageName}
        />
      ))}
    </>
  );
};
