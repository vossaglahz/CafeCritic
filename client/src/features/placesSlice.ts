import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApiClient } from "../helpers/axiosApiClient";
import { PlaceData } from "@/interfaces/placeData";

export interface IPlaceState {
  id: string;
  title: string;
  description: string;
}

interface State {
  places: IPlaceState[];
  error: Error | null;
  loading: boolean;
}

const initialState: State = {
  places: [],
  error: null,
  loading: false
};

export const fetchPlaces = createAsyncThunk('fetch/places', async () => {
    const token = localStorage.getItem('token')
  return await axiosApiClient.get<IPlaceState[]>('/places', {headers: {Authorization: token}}).then(res => res.data);
});

export const createPlace = createAsyncThunk('create/places', 
  async (payload: Omit<FormData, "id">) => {
    const token = localStorage.getItem('token')
    return axiosApiClient.post<PlaceData>("/places/create", payload, {headers: {Authorization: token}})
      .then(res => res.data);
});

const placesSlice = createSlice(
  {
    name: 'places',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(fetchPlaces.fulfilled, (state, action) => {
        state.places = action.payload;
        state.loading = false;
      }).addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
      })
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
      })
    },
  }
)

export default placesSlice.reducer;
