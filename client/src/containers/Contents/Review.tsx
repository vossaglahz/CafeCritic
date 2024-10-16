import { ReviewForm } from "@/components/ReviewForm";
import { createReview } from "@/features/reviewSlice";
import { useAppDispatch } from "@/store/hook";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IReview } from "@/components/ReviewForm";

export function NewReviewForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onReviewSubmit = async (review: Omit<IReview, "id">) => {
    await dispatch(createReview(review));
    navigate("/");
  }

  return <>
    <Typography variant="h4" sx={{ color: 'green' }}>Write Review</Typography>
    <ReviewForm onReviewFormSubmit={onReviewSubmit}/>
  </>
}
