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
import ClearIcon from "@mui/icons-material/Clear";

//Router
import { useParams, useNavigate } from "react-router";

//Redux
import { useSelector } from "react-redux";

//firebase
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

//Swal
import Swal from "sweetalert2";

export default function EditarChofer() {
  const navigate = useNavigate();

  const { id } = useParams();

  //Traigo todos los choferes y despues los filtro por el id
  const usuario = useSelector((state) => state.usuario);
  const choferes = useSelector((state) => state.choferes);
  const choferElegido = choferes.find((chofer) => chofer.id === id);

  //Editor
  const [input, setInput] = useState(choferElegido);

  //Fecha
  const [value, setValue] = useState(new Date());
  const [value1, setValue1] = useState(new Date());

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

  //boton eliminar
  const borrarImagen = (id) => {
    setInput({
      ...input,
      imagenes: input.imagenes.filter((idFilter) => idFilter !== id),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const documento = doc(db, `${usuario.email} chofer`, id);
      await updateDoc(documento, input);
      Swal.fire({
        text: "Actualizacion exitosa",
        confirmButtonText: "Ok",
        icon: "success",
        timer: 2500,
        width: "auto",
      });

      navigate("/mostrarChofer");
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "Actualizacion fallida",
        confirmButtonText: "Ok",
        icon: "error",
        timer: 2500,
        width: "auto",
      });
    }
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
        <form onSubmit={(e) => handleSubmit(e)}>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              spacing={{ xs: 3, md: 8 }}
              columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
            >
              <Grid item xs={4} sm={8} md={16} lg={16}>
                <Card sx={{ maxWidth: 300, margin: "auto" }}>
                  <Button
                    color="error"
                    variant="contained"
                    sx={{ mb: "5%" }}
                    onClick={() => borrarImagen(input.imagen)}
                  >
                    <ClearIcon />
                  </Button>
                  <CardMedia
                    component="img"
                    height="300"
                    image={
                      input.imagen
                        ? input.imagen
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
        </form>
      </Box>
    </>
  );
}
