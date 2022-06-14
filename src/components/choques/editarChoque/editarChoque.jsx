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
import ClearIcon from "@mui/icons-material/Clear";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

//Router
import { useParams, useNavigate } from "react-router";

//Redux
import { useSelector } from "react-redux";

//firebase
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

//Swal
import Swal from "sweetalert2";

export default function EditarChoque() {
  const navigate = useNavigate();

  const { id } = useParams();

  const usuario = useSelector((state) => state.usuario);
  const choques = useSelector((state) => state.choques);
  const choqueElegido = choques.find((choque) => choque.id === id);

  //Editor
  const [input, setInput] = useState(choqueElegido);

  //Fecha
  const [value, setValue] = useState(new Date(input.dia));

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
    const imagenes = [...input.imagenes, file.secure_url];
    setInput({ ...input, imagenes: imagenes });
  };

  //carga
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChofer = function (e) {
    setInput({ ...input, chofer: e.target.value });
  };

  //chofer
  const choferes = useSelector((state) => state.choferes);

  //boton eliminar
  const borrarImagen = (id) => {
    input.imagenes.filter((idFilter) => idFilter !== id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const documento = doc(db, `${usuario.email} choque`, id);
      await updateDoc(documento, input);
      Swal.fire({
        text: "se Agrego el chofer con exito",
        confirmButtonText: "Ok",
        icon: "success",
        timer: 2500,
        width: "auto",
      });

      navigate("/mostrarChoque");
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
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">CHOQUE</Typography>
      </Box>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box>
          <Box sx={{ width: "100%", mt: "2%", mb: "5%" }}>
            <Grid
              container
              spacing={{ xs: 3, md: 6 }}
              columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
            >
              {input.imagenes &&
                input.imagenes.map((imagen) => (
                  <Grid
                    item
                    xs={2}
                    sm={4}
                    md={4}
                    lg={4}
                    sx={{ margin: "auto" }}
                  >
                    <Card>
                      <Button
                        color="error"
                        variant="contained"
                        sx={{ mb: "5%" }}
                        onClick={() => borrarImagen(imagen)}
                      >
                        <ClearIcon />
                      </Button>
                      <CardMedia
                        component="img"
                        height="150"
                        sx={{ objectFit: "contain" }}
                        image={imagen}
                        alt="green iguana"
                      />
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
          <Grid
            container
            spacing={{ xs: 3, md: 8 }}
            columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
          >
            <Grid item xs={4} sm={8} md={16} lg={16}>
              <TextField
                id="standard-basic"
                label="Cargar nuevas imagenes"
                focused
                type="file"
                name="images"
                onChange={handleFiles}
                fullWidth
              />
            </Grid>
            <Grid item xs={4} sm={8} md={8} lg={8}>
              <Box sx={{ minWidth: 120, mt: "2%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Chofer</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={input.chofer}
                    label="Chofer"
                    onChange={handleSelectChofer}
                  >
                    {choferes &&
                      choferes.map((chofer) => (
                        <MenuItem key={chofer.id} value={chofer.nombre}>
                          {chofer.nombre}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={4} sm={8} md={8} lg={8}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  variant="success"
                  label="Dia"
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
            <Grid item xs={4} sm={8} md={8} lg={8}>
              <TextField
                id="standard-basic"
                label="Seguro"
                name="seguro"
                onChange={handleChange}
                fullWidth
                required
                value={input.seguro}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={8} lg={8}>
              <TextField
                id="standard-basic"
                label="Poliza"
                name="poliza"
                onChange={handleChange}
                fullWidth
                required
                value={input.poliza}
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
              <TextField
                id="standard-basic"
                label="DNI"
                name="dni"
                onChange={handleChange}
                fullWidth
                required
                value={input.dni}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={8} lg={8}>
              <TextField
                id="standard-basic"
                label="Telefono"
                name="telefono"
                onChange={handleChange}
                fullWidth
                required
                value={input.telefono}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={8} lg={8}>
              <TextField
                id="standard-basic"
                label="Placa"
                name="placa"
                onChange={handleChange}
                fullWidth
                required
                value={input.placa}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={8} lg={8}>
              <TextField
                id="standard-basic"
                label="Marca"
                name="marca"
                onChange={handleChange}
                fullWidth
                required
                value={input.marca}
              />
            </Grid>
          </Grid>
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
      </form>
    </>
  );
}
