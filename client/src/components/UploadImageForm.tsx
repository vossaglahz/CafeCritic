import { Box, Button, Grid } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FileInput } from "./UI/Form/FileInput";
import { useParams } from "react-router-dom";

export interface IUploadImage {
    id: string;
    imageName: string;
    placeId: string;
}

interface Props {
  onUploadImageFormSubmit: (uploadImage: FormData) => Promise<void>;
}

export function UploadImageForm({ onUploadImageFormSubmit }: Props) {
    const { placeId } = useParams<{ placeId: string }>();

  const [uploadImage, setUploadImage] = useState<Omit<IUploadImage, "id">>({
    imageName: "",
    placeId: ""
  });

  useEffect(() => {
    if (placeId) {
      setUploadImage(prevState => ({ ...prevState, placeId }));
    }
  }, [placeId]);

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData();

    Object.entries(uploadImage).forEach(([key, value]) => {
      if (key === "image" && typeof value === "object") {
        formData.append(key, value);
      } else {
        formData.append(key, `${value}`);
      }
    });

    onUploadImageFormSubmit(formData);
    console.log(uploadImage);
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      const name = e.target.name;
      const file = e.target.files[0];
      setUploadImage(prevState => ({ ...prevState, [name]: file }));
    }
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
          <FileInput
            onChange={onChangeFile}
            name="image"
            label="Image"
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained" sx={{ color: 'white', backgroundColor: 'green' }}>
            Upload Image
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
