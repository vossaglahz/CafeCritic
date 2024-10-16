import { UploadImageForm } from "@/components/UploadImageForm";
import { createImages } from "@/features/imagesSlice";
import { useAppDispatch } from "@/store/hook";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function NewUploadImageForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onUploadImageFormSubmit = async (uploadImage: Omit<FormData, "id">) => {
    await dispatch(createImages(uploadImage));
    navigate("/");
  }

  return <>
    <Typography variant="h4" sx={{ color: 'green' }}>Upload Image</Typography>
    <UploadImageForm onUploadImageFormSubmit={onUploadImageFormSubmit}/>
  </>
}