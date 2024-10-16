import { useEffect, useState } from 'react';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { PlaceData } from '@/interfaces/placeData';
import baseURL from '@/config/axiosData';
import { useNavigate, useParams } from 'react-router-dom';
import ShowOnePlace from '@/components/ShowData/ShowOnePlace';

export const GetOnePlace = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        const [placesResponse, imagesResponse] = await Promise.all([
          baseURL.get(`/places/${placeId}`, { headers: { Authorization: token } }),
          baseURL.get(`/images?placeId=${placeId}`, { headers: { Authorization: token } })
        ]);

        let placeData = placesResponse.data;

        const imagesData = imagesResponse.data;
        const image = imagesData.find((img: any) => img.place.id === placeData.id);

        if (image) {
          placeData = { ...placeData, imageName: image.imageName };
        }

        setPlaceData(placeData);
        console.log(placeData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [placeId]);

  const onReviewHandler = (id: string) => {
    navigate(`/reviews/${id}`);
  };

  const onUploadImageHandler = (id: string) => {
    navigate(`/images/${id}`);
  };

  const onAllImagesHandler = (id: string) => {
    navigate(`/uploadedImages/${id}`);
  };

  const onAllReviewHandler = (id: string) => {
    navigate(`/seeReviews/${id}`);
  };

  return (
    <>
      <Spinner show={isLoading} />
      {placeData && (
        <ShowOnePlace
          key={placeData.id}
          id={placeData.id}
          title={placeData.title}
          description={placeData.description}
          mainImage={placeData.mainImage}
          onReview={onReviewHandler}
          onUploadImage={onUploadImageHandler}
          onImages={onAllImagesHandler}
          onReviews={onAllReviewHandler}
        />
      )}
    </>
  );
};
