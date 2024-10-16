import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { FileInput } from "./UI/Form/FileInput";

export interface IPlace {
    id: string;
    title: string;
    description: string;
    mainImage: string;
}

interface Props {
  onPlaceFormSubmit: (place: Omit<FormData, "id">) => Promise<void>;
}

export function PlaceForm({ onPlaceFormSubmit }: Props) {
  const [isAgree, setIsAgree] = useState(false);

  const [place, setPlace] = useState<Omit<IPlace, "id">>({
    title: "",
    description: "",
    mainImage: ""
  });

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData();

    Object.entries(place).forEach(([key, value]) => {
      if (key === "image" && typeof value === "object") {
        formData.append(key, value);
      } else {
        formData.append(key, `${value}`);
      }
    });

    onPlaceFormSubmit(formData);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPlace(prevPlace => ({
      ...prevPlace,
      [name]: value
    }));
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      const name = e.target.name;
      const file = e.target.files[0];
      setPlace(prevState => ({ ...prevState, [name]: file }));
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAgree(e.target.checked);
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
            id="title"
            name="title"
            label="Title"
            value={place.title}
            onChange={inputChangeHandler}
            sx={{ color: 'white' }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            required={true}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            id="description"
            name="description"
            label="Description"
            value={place.description}
            onChange={inputChangeHandler}
            sx={{ color: 'white' }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            required={true}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            onChange={onChangeFile}
            name="image"
            label="mainImage"
          />
        </Grid>
        <Grid item xs>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAgree}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="I agree to the publication"
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained" sx={{ color: 'white', backgroundColor: 'green' }} disabled={!isAgree}>
            Create Place
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
