import React, { useState } from "react";

//Mui
import { TextField, Grid, Box, Button, Stack, Typography } from "@mui/material";

//firebase
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

//Redux
import { useSelector } from "react-redux";

//Swal
import Swal from "sweetalert2";

export default function CrearChofer() {
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    telefono: "",
    carnet: "",
    fdv: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
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
        documento: "",
        telefono: "",
        carnet: "",
        fdv: "",
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
                <TextField
                  id="standard-basic"
                  label="Carnet de conducir"
                  name="carnet"
                  onChange={handleChange}
                  fullWidth
                  required
                  value={input.carnet}
                />
              </Grid>
              <Grid item xs={4} sm={8} md={16} lg={16}>
                <TextField
                  id="standard-basic"
                  label="Fecha de vencimiento"
                  name="fdv"
                  onChange={handleChange}
                  fullWidth
                  required
                  value={input.fdv}
                />
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
