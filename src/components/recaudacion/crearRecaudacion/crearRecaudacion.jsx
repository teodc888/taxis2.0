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
import { getChoferesFirebase } from "../../../redux/actions/index";

//Swal
import Swal from "sweetalert2";

export default function CrearRecaudacion() {
  const [value, setValue] = useState(new Date());
  const dispatch = useDispatch();

  //trae todos los choferes
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

  //cargar recaudaciones
  const [input, setInput] = useState({
    dia: fecha,
    totalNeto: "",
    porcentajeChofer: 0,
    gnc: "",
    kilometros: "",
    gastoExtra: 0,
    chofer: "",
    turno: "",
    total: 0,
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

  const handleSelectTurno = function (e) {
    setInput({ ...input, turno: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `${usuario.email} recaudacion`), input);
      Swal.fire({
        text: "se Agrego el chofer con exito",
        confirmButtonText: "Ok",
        icon: "success",
        timer: 2500,
        width: "auto",
      });
      setInput({
        dia: fecha,
        totalNeto: "",
        porcentajeChofer: 0,
        gnc: "",
        kilometros: "",
        gastoExtra: 0,
        chofer: "",
        turno: "",
        total: 0,
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

  useEffect(() => {
    if (input.totalNeto !== "") {
      setInput({ ...input, porcentajeChofer: input.totalNeto * 0.35 });
    }
  }, [input.totalNeto]);

  useEffect(() => {
    if (
      input.totalNeto !== "" &&
      input.porcentajeChofer !== 0 &&
      input.gnc !== ""
    ) {
      setInput({
        ...input,
        total:
          Number(input.totalNeto) -
          (Number(input.porcentajeChofer) +
            Number(input.gnc) +
            Number(input.gastoExtra)),
      });
    }
  }, [
    input.totalNeto,
    input.porcentajeChofer,
    input.gnc,
    input.totalNeto,
    input.gastoExtra,
  ]);

  const choferElegido =
    choferes && choferes.find((chofer) => chofer.nombre === input.chofer);

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
          <Typography variant="h4">CREAR RECAUDACION</Typography>
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
                            sx={{ textTransform: "capitalize" }}
                          >
                            {choferes &&
                              choferes.map((chofer) => (
                                <MenuItem
                                  key={chofer.id}
                                  value={chofer.nombre}
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {chofer.nombre}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={4} sm={8} md={8} lg={8}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Turno
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={input.turno}
                            label="turno"
                            name="turno"
                            onChange={handleSelectTurno}
                          >
                            <MenuItem value={"mañana-tarde"}>
                              Mañana-Tarde
                            </MenuItem>
                            <MenuItem value={"tarde-noche"}>
                              Tarde-Noche
                            </MenuItem>
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
                        label="Total Neto"
                        name="totalNeto"
                        onChange={handleChange}
                        fullWidth
                        required
                        value={input.totalNeto}
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={4} sm={8} md={8} lg={8}>
                      <TextField
                        id="standard-basic"
                        label="35 % para el chofer"
                        name="porcentajeChofer"
                        fullWidth
                        disabled
                        value={input.porcentajeChofer}
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={4} sm={8} md={8} lg={8}>
                      <TextField
                        id="standard-basic"
                        label="Gnc"
                        name="gnc"
                        onChange={handleChange}
                        fullWidth
                        required
                        value={input.gnc}
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={4} sm={8} md={8} lg={8}>
                      <TextField
                        id="standard-basic"
                        label="Kilometros"
                        name="kilometros"
                        onChange={handleChange}
                        fullWidth
                        required
                        value={input.kilometros}
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={4} sm={8} md={8} lg={8}>
                      <TextField
                        id="standard-basic"
                        label="Gastos Extras"
                        name="gastoExtra"
                        onChange={handleChange}
                        fullWidth
                        required
                        value={input.gastoExtra}
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={4} sm={8} md={8} lg={8}>
                      <TextField
                        id="standard-basic"
                        label="Total"
                        name="total"
                        fullWidth
                        disabled
                        value={input.total}
                        type="number"
                      />
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
                <Card sx={{ maxWidth: 200, margin: "auto" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    sx={{ objectFit: "contain" }}
                    image={
                      choferElegido
                        ? choferElegido.imagen
                          ? choferElegido.imagen
                          : "https://iconarchive.com/download/i102645/graphicloads/flat-finance/person.ico"
                        : "https://iconarchive.com/download/i102645/graphicloads/flat-finance/person.ico"
                    }
                    alt="green iguana"
                  />
                </Card>
                <Typography variant="h6" sx={{ mt: "2%" }}>
                  Chofer: {choferElegido ? choferElegido.nombre : null}{" "}
                  {choferElegido ? choferElegido.apellido : null}
                </Typography>
                <Typography variant="h6">Turno: {input.turno}</Typography>
                <Typography variant="h6">Dia: {input.dia}</Typography>
                <Typography variant="h6">
                  Total Neto: {input.totalNeto}
                </Typography>
                <Typography variant="h6">
                  Porcentaje Chofer: {input.porcentajeChofer}
                </Typography>
                <Typography variant="h6">Gnc: {input.gnc}</Typography>
                <Typography variant="h6">
                  Kilometros: {input.kilometros}
                </Typography>
                <Typography variant="h6">
                  Gasto Extra: {input.gastoExtra}
                </Typography>
                <Typography variant="h6">Total: {input.total}</Typography>
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
    </>
  );
}
