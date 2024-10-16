import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApiClient } from "../helpers/axiosApiClient";
import { ImagesData } from "@/interfaces/imagesData";

export interface IImagesState {
  id: string;
  imageName: string;
  placeId: string;
}

interface State {
  images: IImagesState[];
  error: Error | null;
  loading: boolean;
}

const initialState: State = {
    images: [],
  error: null,
  loading: false
};

export const fetchImages = createAsyncThunk('fetch/images', async () => {
    const token = localStorage.getItem('token')
  return await axiosApiClient.get<IImagesState[]>('/images', {headers: {Authorization: token}}).then(res => res.data);
});

export const createImages = createAsyncThunk('create/images', 
  async (payload: Omit<FormData, "id">) => {
    const token = localStorage.getItem('token')
    return axiosApiClient.post<ImagesData>("/images/create", payload, {headers: {Authorization: token}})
      .then(res => res.data);
});

const placesSlice = createSlice(
  {
    name: 'images',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(fetchImages.fulfilled, (state, action) => {
        state.images = action.payload;
        state.loading = false;
      }).addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
      })
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
      })
    },
  }
)

export default placesSlice.reducer;
