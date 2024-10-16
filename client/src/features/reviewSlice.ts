import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApiClient } from "../helpers/axiosApiClient";
import { IReview } from "@/components/ReviewForm";

export interface IReviewState extends Omit<IReview, "id"> {
  id: string;
}

interface State {
  reviews: IReviewState[];
  error: Error | null;
  loading: boolean;
}

const initialState: State = {
  reviews: [],
  error: null,
  loading: false
};


export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const token = localStorage.getItem('token');
  return await axiosApiClient.get<IReviewState[]>('/reviews', {
    headers: { Authorization: token }
  }).then(res => res.data);
});

export const createReview = createAsyncThunk('reviews/createReview',
  async (payload: Omit<IReview, "id">) => {
    const token = localStorage.getItem('token');
    return axiosApiClient.post<IReviewState>("/reviews/create", payload, {
      headers: { Authorization: token }
    }).then(res => res.data);
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.loading = false;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
      })
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      });
  }
});

export default reviewsSlice.reducer;
