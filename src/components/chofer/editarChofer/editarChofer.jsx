import React, { useState } from "react";

//Mui
import {
  TextField,
  Grid,
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Card,
  CardMedia,
  Button,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

//Router
import { useParams } from "react-router";

//Redux
import { useSelector } from "react-redux";

export default function EditarChofer() {
  const { id } = useParams();

  //Traigo todos los choferes y despues los filtro por el id
  const choferes = useSelector((state) => state.choferes);
  const choferElegido = choferes.find((chofer) => chofer.id === id);

  //Editor
  const [input, setInput] = useState(choferElegido);

  //Fecha
  const [value, setValue] = useState(new Date());
  const [value1, setValue1] = useState(new Date());

  console.log(value);

  //Cargar Imagen
  const handleFiles = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "d3bholnc ");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dellacqua-shops/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setInput({ ...input, imagen: file.secure_url });
  };

  //Cargar formulario
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCarnet = function (e) {
    setInput({ ...input, carnet: e.target.value });
  };

  return (
    <>
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mb: "2%" }}
          textAlign="center"
        >
          EDITOR CHOFER
        </Typography>

        <Box sx={{ width: "100%" }}>
          <Grid
            container
            spacing={{ xs: 3, md: 8 }}
            columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
          >
            <Grid item xs={4} sm={8} md={16} lg={16}>
              <Card sx={{ maxWidth: 300, margin: "auto" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={
                    choferElegido.imagen
                      ? choferElegido.imagen
                      : "https://iconarchive.com/download/i102645/graphicloads/flat-finance/person.ico"
                  }
                  sx={{ objectFit: "contain" }}
                  alt="Chofer"
                />
              </Card>
            </Grid>
            <Grid item xs={4} sm={8} md={16} lg={16}>
              <TextField
                label="Cargar imagen nueva"
                focused
                type="file"
                name="images"
                onChange={handleFiles}
                fullWidth
                sx={{ mt: "2%" }}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={8} lg={8}>
              <TextField
                id="standard-basic"
                label="Nombre"
                name="nombre"
                onChange={handleChange}
                fullWidth
                required
                value={input.nombre}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={8} lg={8}>
              <TextField
                id="standard-basic"
                label="Apellido"
                name="apellido"
                onChange={handleChange}
                fullWidth
                required
                value={input.apellido}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={8} lg={8}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  variant="success"
                  label="Dia de nacimiento"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                    setInput({
                      ...input,
                      fechaDeNacimiento:
                        newValue.getDate() +
                        "/" +
                        (newValue.getMonth() + 1) +
                        "/" +
                        newValue.getFullYear(),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ width: "100%" }} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4} sm={8} md={8} lg={8}>
              <TextField
                id="standard-basic"
                label="Documento"
                name="documento"
                onChange={handleChange}
                fullWidth
                required
                type="number"
                value={input.documento}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={16} lg={16}>
              <TextField
                id="standard-basic"
                label="Telefono"
                name="telefono"
                onChange={handleChange}
                fullWidth
                required
                type="number"
                value={input.telefono}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={8} lg={8}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Carnet de taxi
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={input.carnet}
                    label="Carnet de taxi"
                    onChange={handleSelectCarnet}
                    sx={{ textTransform: "capitalize" }}
                  >
                    <MenuItem value="si">Si</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={4} sm={8} md={8} lg={8}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  variant="success"
                  label="Fecha de vencimiento del carnet"
                  value={value1}
                  onChange={(newValue) => {
                    setValue1(newValue);
                    setInput({
                      ...input,
                      fdv:
                        newValue.getDate() +
                        "/" +
                        (newValue.getMonth() + 1) +
                        "/" +
                        newValue.getFullYear(),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ width: "100%" }} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "5%" }}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ width: { xs: "100%", sm: "50%", md: "30%", lg: "20%" } }}
          >
            Guardar cambios
          </Button>
        </Box>
      </Box>
    </>
  );
}
