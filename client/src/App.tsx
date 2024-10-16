import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/hook';
import { useEffect } from 'react';
import { validateToken } from './features/usersSlice';
import { Auth } from './containers/Auth/Auth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NewPlaceForm } from './containers/Contents/AddPlace';
import { GetPlaces } from './containers/Contents/GetPlaces';
import { GetOnePlace } from './containers/Contents/GetOnePlace';
import { GetPublished } from './containers/Contents/GetPublished';
import { GetPublishedModer } from './containers/Contents/GetPublishedModer';
import { NewUploadImageForm } from './containers/Contents/UploadImage';
import { GetAllImages } from './containers/Contents/GetAllImages';
import { NewReviewForm } from './containers/Contents/Review';
import { GetAllReviews } from './containers/Contents/GetAllReviews';

function App() {
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(state => state.users)

  useEffect(() => {
    dispatch(validateToken())
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={
            <GetPlaces />
          }/>
        <Route path='/places/:placeId' element={
            <ProtectedRoute user={user}>
              <GetOnePlace />
            </ProtectedRoute>
          }/>
        <Route path='/images/:placeId' element={
            <ProtectedRoute user={user}>
              <NewUploadImageForm />
            </ProtectedRoute>
          }/>
        <Route path='/uploadedImages/:placeId' element={
            <ProtectedRoute user={user}>
              <GetAllImages />
            </ProtectedRoute>
          }/>
          <Route path='/reviews/:placeId' element={
            <ProtectedRoute user={user}>
              <NewReviewForm />
            </ProtectedRoute>
          }/>
          <Route path='/seeReviews/:placeId' element={
            <ProtectedRoute user={user}>
              <GetAllReviews />
            </ProtectedRoute>
          }/>
        <Route path='/add' element={
            <ProtectedRoute user={user}>
              <NewPlaceForm/>
            </ProtectedRoute>
          }/>
        <Route path='/status' element={
            <ProtectedRoute user={user}>
              <GetPublished/>
            </ProtectedRoute>
          }/>
        <Route path='/moderate' element={
            <ProtectedRoute user={user}>
              <GetPublishedModer />
            </ProtectedRoute>
          }/>
        <Route path='/auth' element={<Auth/>} />
      </Route>
    </Routes>
  );
}

export default App;
