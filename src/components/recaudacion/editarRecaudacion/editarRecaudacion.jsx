import React, { useState, useEffect } from "react";

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
  Button
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

//Router
import { useParams } from "react-router";

//Redux
import { useSelector } from "react-redux";

export default function EditarRecaudacion() {
  const { id } = useParams();

  //Traigo todos los choferes y despues los filtro por el id
  const recaudaciones = useSelector((state) => state.recaudaciones);
  const recaudacionesElegida = recaudaciones.find(
    (recaudacion) => recaudacion.id === id
  );
  const choferes = useSelector((state) => state.choferes);

  //Editor
  const [input, setInput] = useState(recaudacionesElegida);

  //fecha
  const [value, setValue] = useState(new Date());

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
        porcentajeChofer: input.totalNeto * 0.35,
      });
    }
  }, [input.totalNeto, input.porcentajeChofer, input.gnc, input.gastoExtra]);

  console.log(input);
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mb: "2%" }}
          textAlign="center"
        >
          EDITOR RECAUDACIONES
        </Typography>
        <Grid
          container
          spacing={{ xs: 3, md: 8 }}
          columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
        >
          <Grid item xs={4} sm={8} md={16} lg={16}>
            <Box sx={{ minWidth: 120, mt: "2%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chofer</InputLabel>
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
                <InputLabel id="demo-simple-select-label">Turno</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={input.turno}
                  label="turno"
                  name="turno"
                  onChange={handleSelectTurno}
                >
                  <MenuItem value={"mañana-tarde"}>Mañana-Tarde</MenuItem>
                  <MenuItem value={"tarde-noche"}>Tarde-Noche</MenuItem>
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
