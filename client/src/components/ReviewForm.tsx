import { Box, Button, Grid, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface IReview {
  id: string;
  text: string;
  ratingFood: number;
  ratingQuality: number;
  ratingInterior: number;
  datetime: string;
  placeId: string;
}

interface Props {
  onReviewFormSubmit: (review: Omit<IReview, "id">) => Promise<void>;
}

export function ReviewForm({ onReviewFormSubmit }: Props) {
  const { placeId } = useParams<{ placeId: string }>();

  const [review, setReview] = useState<Omit<IReview, "id">>({
    text: "",
    ratingFood: 1,
    ratingQuality: 1,
    ratingInterior: 1,
    datetime: "",
    placeId: ""
  });

  useEffect(() => {
    if (placeId) {
      setReview(prevState => ({ ...prevState, placeId }));
    }
  }, [placeId]);

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datetime = new Date().toISOString();

    const updatedReview = { ...review, datetime };

    onReviewFormSubmit(updatedReview);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const numericValue = Math.min(Math.max(Number(value), 1), 5);

    setReview(prevReview => ({
      ...prevReview,
      [name]: name.includes("rating") ? numericValue : value
    }));
  };

  return (
    <Box
      component={"form"}
      autoComplete="off"
      onSubmit={submitFormHandler}
      paddingY={2}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            id="text"
            name="text"
            label="Text"
            value={review.text}
            onChange={inputChangeHandler}
            required
            sx={{ color: 'white' }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            type="number"
            variant="outlined"
            id="ratingFood"
            name="ratingFood"
            label="Rating Food"
            value={review.ratingFood}
            onChange={inputChangeHandler}
            required
            inputProps={{ min: 1, max: 5 }}
            sx={{ color: 'white' }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            type="number"
            variant="outlined"
            id="ratingQuality"
            name="ratingQuality"
            label="Rating Quality"
            value={review.ratingQuality}
            onChange={inputChangeHandler}
            required
            inputProps={{ min: 1, max: 5 }}
            sx={{ color: 'white' }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            type="number"
            variant="outlined"
            id="ratingInterior"
            name="ratingInterior"
            label="Rating Interior"
            value={review.ratingInterior}
            onChange={inputChangeHandler}
            required
            inputProps={{ min: 1, max: 5 }}
            sx={{ color: 'white' }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained" sx={{ color: 'white', backgroundColor: 'green' }}>
            Post Review
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
