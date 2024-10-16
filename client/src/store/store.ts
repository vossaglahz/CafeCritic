import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '@/features/usersSlice.ts';
import placesReducer from '@/features/placesSlice'

const store = configureStore({
  reducer: {
    places: placesReducer,
    users: usersReducer
  }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
