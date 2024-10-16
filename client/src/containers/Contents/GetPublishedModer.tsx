import { useEffect, useState } from 'react';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { parsePlaceData } from '@/helpers/parseData';
import { PlaceData } from '@/interfaces/placeData';
import baseURL from '@/config/axiosData';
import { useAppSelector } from '@/store/hook';
import { UserRoles } from '@/features/usersSlice';
import { useNavigate } from 'react-router-dom';
import ShowPublishedModer from '@/components/ShowData/ShowPublishedModer';

export const GetPublishedModer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [placeData, setPlaceData] = useState<PlaceData[]>([]);
  const { user } = useAppSelector(state => state.users);
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

  useEffect(() => {
    if(user?.role !== UserRoles.admin) navigate('/')
  }, [user])

  const handlePublish = async (id: string) => {
    try {
      await baseURL.patch(`/places/${id}`, { published: true }, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      navigate("/")
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await baseURL.delete(`/places/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      navigate("/");
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <Spinner show={isLoading} />
      {placeData.map(place => (
        <ShowPublishedModer
          key={place.id}
          id={place.id}
          title={place.title}
          mainImage={place.mainImage}
          onPublish={handlePublish}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
};
