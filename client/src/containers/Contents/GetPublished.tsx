import { useEffect, useState } from 'react';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { parsePlaceData } from '@/helpers/parseData';
import { PlaceData } from '@/interfaces/placeData';
import baseURL from '@/config/axiosData';
import ShowPublished from '@/components/ShowData/ShowPublished';

export const GetPublished = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [placeData, setPlaceData] = useState<PlaceData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        const [placesResponse, imagesResponse] = await Promise.all([
          baseURL.get('/places', { headers: { Authorization: token } }),
          baseURL.get('/images', { headers: { Authorization: token } })
        ]);

        let parsedPlaces = parsePlaceData(placesResponse.data);
        const imagesData = imagesResponse.data;

        parsedPlaces = parsedPlaces
          .filter(place => place.published == false)
          .map(place => {
            const image = imagesData.find((img: { place: { id: string; }; }) => img.place.id === place.id);
            return image ? { ...place, imageName: image.imageName } : place;
          });

        setPlaceData(parsedPlaces);
        console.log(parsedPlaces);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Spinner show={isLoading} />
      {placeData.map(place => (
        <ShowPublished
          key={place.id}
          title={place.title}
          mainImage={place.mainImage}
        />
      ))}
    </>
  );
};
