import React, { useState, useEffect } from "react";

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
import { useSelector, useDispatch } from "react-redux";
import { getChoferesFirebase } from "../../../redux/actions/index";

//Swal
import Swal from "sweetalert2";

export default function CrearChoque() {
  const [value, setValue] = useState(new Date());
  const dispatch = useDispatch();

  //traer todos los choferes
  const choferes = useSelector((state) => state.choferes);
  const usuario = useSelector((state) => state.usuario);
  const autenticacion = useSelector((state) => state.autenticacion);

  useEffect(() => {
    if (autenticacion === true) {
      dispatch(getChoferesFirebase(usuario.email));
    }
  }, [dispatch, autenticacion, usuario]);

  let fecha =
    value &&
    value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear();

  //cargar choques
  const [input, setInput] = useState({
    dia: fecha,
    imagenes: [],
    seguro: "",
    poliza: "",
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    placa: "",
    marca: "",
    chofer: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChofer = function (e) {
    setInput({ ...input, chofer: e.target.value });
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
    const imagenes = [...input.imagenes, file.secure_url];
    setInput({ ...input, imagenes: imagenes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `${usuario.email} choque`), input);
      Swal.fire({
        text: "se Agrego el chofer con exito",
        confirmButtonText: "Ok",
        icon: "success",
        timer: 2500,
        width: "auto",
      });
      setInput({
        dia: "",
        imagenes: [],
        seguro: "",
        poliza: "",
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        placa: "",
        marca: "",
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
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ mt: "1%" }}
        >
          <Typography variant="h4">CREAR CHOQUE</Typography>
          <Box sx={{ width: { xs: "90%", sm: "70%", md: "50%", lg: "50%" } }}>
            <Grid
              container
              spacing={{ xs: 3, md: 8 }}
              columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
            >
              <Grid item xs={4} sm={8} md={16} lg={16}>
                <Box sx={{ minWidth: 120, mt: "2%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Chofer
                    </InputLabel>
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
              <Grid item xs={4} sm={8} md={16} lg={16}>
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
              <Grid item xs={4} sm={8} md={16} lg={16}>
                <TextField
                  id="standard-basic"
                  label="Imagenes"
                  focused
                  type="file"
                  name="images"
                  onChange={handleFiles}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4} sm={8} md={16} lg={16}>
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
              <Grid item xs={4} sm={8} md={16} lg={16}>
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
              <Grid item xs={4} sm={8} md={16} lg={16}>
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
              <Grid item xs={4} sm={8} md={16} lg={16}>
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
              <Grid item xs={4} sm={8} md={16} lg={16}>
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
          </Box>
          <Button type="submit" variant="contained" color="success">
            Crear
          </Button>
        </Stack>
      </form>
    </>
  );
}
