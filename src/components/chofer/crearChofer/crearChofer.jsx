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
  Card,
  CardMedia,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

//firebase
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

//Redux
import { useSelector, useDispatch } from "react-redux";
import {getChoferesFirebase} from "../../../redux/actions/index"

//Swal
import Swal from "sweetalert2";

export default function CrearChofer() {
  const dispatch = useDispatch()
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
    imagen: "",
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
      await addDoc(collection(db, `${usuario.email} chofer`), input);
      Swal.fire({
        text: "se Agrego el chofer con exito",
        confirmButtonText: "Ok",
        icon: "success",
        timer: 2500,
        width: "auto",
      });
      setInput({
        nombre: "",
        apellido: "",
        fechaDeNacimiento: fecha,
        documento: "",
        telefono: "",
        carnet: "si",
        fdv: fechaDV,
      });
      dispatch(getChoferesFirebase(usuario !== null ? usuario.email : null));
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
          <Box>
            <Grid
              container
              spacing={{ xs: 3, md: 8 }}
              columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
            >
              <Grid
                item
                xs={4}
                sm={4}
                md={8}
                lg={8}
                sx={{ mt: { xs: "2%", sm: "0", md: "0", lg: "0" } }}
              >
                <Box>
                  <Grid
                    container
                    spacing={{ xs: 3, md: 8 }}
                    columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
                  >
                    <Grid item xs={4} sm={8} md={16} lg={16}>
                      <TextField
                        label="Imagen"
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
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                md={8}
                lg={8}
                sx={{ mt: { xs: "5%", sm: "0", md: "0", lg: "0" } }}
              >
                <Card sx={{ maxWidth: 300, margin: "auto" }}>
                  <CardMedia
                    component="img"
                    height="300"
                    sx={{ objectFit: "contain" }}
                    image={
                      input.imagen
                        ? input.imagen
                        : "https://iconarchive.com/download/i102645/graphicloads/flat-finance/person.ico"
                    }
                    alt="green iguana"
                  />
                </Card>
                <Typography variant="h6" sx={{ mt: "2%" }}>
                  Nombre: {input.nombre}
                </Typography>
                <Typography variant="h6">Apellido: {input.apellido}</Typography>
                <Typography variant="h6">
                  Fecha de nacimiento: {input.fechaDeNacimiento}
                </Typography>
                <Typography variant="h6">
                  Documento: {input.documento}
                </Typography>
                <Typography variant="h6">Telefono: {input.telefono}</Typography>
                <Typography variant="h6">
                  Carnet de taxi: {input.carnet === "si" ? "Si" : "No"}
                </Typography>
                <Typography variant="h6">
                  Fecha de vencimiento del carnet: {input.fdv}
                </Typography>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: { xs: "5%", sm: "2%", md: "2%", lg: "2%" },
              }}
            >
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ width: { xs: "100%", sm: "50%", md: "30%", lg: "20%" } }}
              >
                Crear
              </Button>
            </Box>
          </Box>
        </Stack>
      </form>
    </div>
  );
}
