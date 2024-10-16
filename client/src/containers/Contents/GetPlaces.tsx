import { useEffect, useState } from 'react';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { useNavigate } from 'react-router';
import { parsePlaceData } from '@/helpers/parseData';
import { PlaceData } from '@/interfaces/placeData';
import baseURL from '@/config/axiosData';
import ShowPlaces from '@/components/ShowData/ShowPlaces';

export const GetPlaces = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [placeData, setPlaceData] = useState<PlaceData[]>([]);
  const navigate = useNavigate();

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
          .filter(place => place.published)
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

  const onPlacesHandler = (id: string) => {
    navigate(`/places/${id}`);
  };

  return (
    <>
      <Spinner show={isLoading} />
      {placeData.map(place => (
        <ShowPlaces
          key={place.id}
          onPlace={() => onPlacesHandler(place.id)}
          title={place.title}
          mainImage={place.mainImage}
        />
      ))}
    </>
  );
};
