import { PlaceForm } from "@/components/PlaceForm";
import { createPlace } from "@/features/placesSlice";
import { useAppDispatch } from "@/store/hook";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function NewPlaceForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onPlaceFormSubmit = async (place: Omit<FormData, "id">) => {
    await dispatch(createPlace(place));
    navigate("/");
  }

  return <>
    <Typography variant="h4" sx={{ color: 'green' }}>New Place</Typography>
    <PlaceForm onPlaceFormSubmit={onPlaceFormSubmit}/>
  </>
}