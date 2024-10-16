import { useEffect, useState } from 'react';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import baseURL from '@/config/axiosData';
import { useParams } from 'react-router-dom';
import { parseReviewData } from '@/helpers/parseData';
import { ReviewData } from '@/interfaces/reviewData';
import ShowAllReviews from '@/components/ShowData/ShowAllReviews';

export const GetAllReviews = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allReviews, setAllReviews] = useState<ReviewData[]>([])

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        const [reviewResponse] = await Promise.all([
          baseURL.get(`/reviews?placeId=${placeId}`, { headers: { Authorization: token } })
        ]);
        let parsedReviews = parseReviewData(reviewResponse.data);
        setAllReviews(parsedReviews)

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
      {allReviews && allReviews.map((review) => (
        <ShowAllReviews
          key={review.id}
          text={review.text}
          ratingFood={review.ratingFood}
          ratingQuality={review.ratingQuality}
          ratingInterior={review.ratingInterior}
          datetime={review.datetime}
        />
      ))}
    </>
  );
};
