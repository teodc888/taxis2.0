import React, { useState } from "react";

//Mui
import {
  TextField,
  Grid,
  Box,
  Button,
  Stack,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

//firebase
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

//Redux
import { useSelector } from "react-redux";

//Swal
import Swal from "sweetalert2";

export default function CrearChofer() {
  const [value, setValue] = useState(new Date());
  const [value1, setValue1] = useState(new Date());

  let fecha =
    value &&
    value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear();

  let fechaDV =
    value1 &&
    value1.getDate() +
      "/" +
      (value1.getMonth() + 1) +
      "/" +
      value1.getFullYear();

  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    fechaDeNacimiento: fecha,
    documento: "",
    telefono: "",
    carnet: "si",
    fdv: fechaDV,
    imagen:"",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCarnet = function (e) {
    setInput({ ...input, carnet: e.target.value });
  };

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

  const usuario = useSelector((state) => state.usuario);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(
        collection(db, `${usuario.email} chofer`),
        input
      );
      Swal.fire({
        text: "se Agrego el chofer con exito",
        confirmButtonText: "Ok",
        icon: "success",
        timer: 2500,
        width: "auto",
      });
      console.log(docRef);
      setInput({
        nombre: "",
        apellido: "",
        fechaDeNacimiento: fecha,
        documento: "",
        telefono: "",
        carnet: "si",
        fdv: fechaDV,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "No se puedo agregar el chofer ",
        confirmButtonText: "Ok",
        icon: "error",
        timer: 2500,
        width: "auto",
      });
    }
  };

  console.log(input);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ mt: "1%" }}
        >
          <Typography variant="h4">CREAR CHOFER</Typography>
          <Box sx={{ width: { xs: "90%", sm: "70%", md: "50%", lg: "50%" } }}>
            <Grid
              container
              spacing={{ xs: 3, md: 6 }}
              columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
            >
              <Grid item xs={4} sm={8} md={16} lg={16}>
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
              <Grid item xs={4} sm={8} md={16} lg={16}>
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
              <Grid item xs={4} sm={8} md={16} lg={16}>
                <TextField type="file" name="images" onChange={handleFiles} fullWidth  />
              </Grid>
              <Grid item xs={4} sm={8} md={16} lg={16}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    variant="success"
                    label="Dia de nacimiento"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                      setInput({
                        ...input,
                        dia:
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
              <Grid item xs={4} sm={8} md={16} lg={16}>
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
              <Grid item xs={4} sm={8} md={16} lg={16}>
                <Box sx={{ minWidth: 120 }}>
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
              <Grid item xs={4} sm={8} md={16} lg={16}>
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
          <Button variant="contained" color="success" type="submit">
            Crear
          </Button>
        </Stack>
      </form>
    </div>
  );
}
