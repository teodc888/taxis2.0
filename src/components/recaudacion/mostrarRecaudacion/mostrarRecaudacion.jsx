import React, { useEffect, useState } from "react";

//Mui
import {
  Grid,
  Box,
  Stack,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  CardMedia,
  Button,
} from "@mui/material";

//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getRecaudacionesFirebase,
  getChoferesFirebase,
  filtradoNombre,
  filtradoTurno,
  filtrarRecaudacion,
  filtrarKilometros,
} from "../../../redux/actions/index";

import { ToastContainer } from "react-toastify";

//Componentes
import CardTaxi from "../../card/card";
import Paginado from "../../paginado/paginado";

//Exel
import * as XLSX from "xlsx";

export default function MostrarRecaudacion() {
  const dispatch = useDispatch();

  const autenticacion = useSelector((state) => state.autenticacion);
  const usuario = useSelector((state) => state.usuario);

  const recaudaciones = useSelector((state) => state.recaudaciones);

  useEffect(() => {
    if (autenticacion === true) {
      dispatch(getRecaudacionesFirebase(usuario.email));
      dispatch(getChoferesFirebase(usuario.email));
    }
  }, [dispatch, autenticacion, usuario]);

  // Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [productoPorPagina] = useState(12);
  const indeceDelUltimoProducto = currentPage * productoPorPagina; // 10
  const indiceDelPrimerProducto = indeceDelUltimoProducto - productoPorPagina; // 0
  const currentRecaudaciones = recaudaciones.slice(
    indiceDelPrimerProducto,
    indeceDelUltimoProducto
  );
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  //Filtrado
  const filtrado = useSelector((state) => state.filtrado);
  const choferes = useSelector((state) => state.choferes);

  const [filtro, setFiltro] = useState(filtrado);

  function handelfiltrarPorNombre(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filtradoNombre(e.target.value));
    setFiltro({
      ...filtro,
      nombre: e.target.value,
    });
  }

  function handelfiltrarPorTurno(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filtradoTurno(e.target.value));
    setFiltro({
      ...filtro,
      turno: e.target.value,
    });
  }

  function handelfiltrarPorKilometros(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filtrarKilometros(e.target.value));
    setFiltro({
      ...filtro,
      kilometros: e.target.value,
    });
  }

  function handelfiltrarPorRecaudacion(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filtrarRecaudacion(e.target.value));
    setFiltro({
      ...filtro,
      total: e.target.value,
    });
  }

  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Typography variant="h4">RECAUDACIONES</Typography>
        {currentRecaudaciones.length !== 0 && (
          <>
            <Box sx={{ width: "100%", mt: "1%" }}>
              <Grid
                container
                spacing={{ xs: 3, md: 6 }}
                columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
              >
                <Grid item xs={4} sm={8} md={4} lg={4}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Filtrar por nombre
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filtro.nombre}
                        name="nombre"
                        label="Filtrar por nombre"
                        onChange={(e) => handelfiltrarPorNombre(e)}
                        sx={{ textTransform: "capitalize" }}
                      >
                        <MenuItem value="todos"> Todos</MenuItem>
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
                <Grid item xs={4} sm={8} md={4} lg={4}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Filtrar por turno
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filtro.turno}
                        name="turno"
                        label="Filtrar por turno"
                        onChange={(e) => handelfiltrarPorTurno(e)}
                        sx={{ textTransform: "capitalize" }}
                      >
                        <MenuItem value="todos"> Todos</MenuItem>
                        <MenuItem value="ma??ana-tarde"> Ma??ana-Tarde</MenuItem>
                        <MenuItem value="tarde-noche"> Tarde-Noche</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={8} md={4} lg={4}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Filtrar por mayor/menor recaudacion
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filtro.total}
                        name="total"
                        label="Filtrar por mayor/menor recaudacion"
                        onChange={(e) => handelfiltrarPorRecaudacion(e)}
                        sx={{ textTransform: "capitalize" }}
                      >
                        <MenuItem value="todos"> Todos</MenuItem>
                        <MenuItem value="mayor"> Mayor</MenuItem>
                        <MenuItem value="menor"> Menor</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={8} md={4} lg={4}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Filtrar por kilometros recorridos
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filtro.kilometros}
                        name="kilometros"
                        label=" Filtrar por kilometros recorridos"
                        onChange={(e) => handelfiltrarPorKilometros(e)}
                        sx={{ textTransform: "capitalize" }}
                      >
                        <MenuItem value="todos"> Todos</MenuItem>
                        <MenuItem value="mayor"> Mayor</MenuItem>
                        <MenuItem value="menor"> Menor</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Button
              variant="contained"
              color="success"
              onClick={() => downloadExcel(recaudaciones)}
              sx={{
                transition: "all 0.3s ease-in-out",
                ":hover": { transform: "scale(1.2)" },
              }}
            >
              IMPORTAR A EXEL
            </Button>
          </>
        )}
        {currentRecaudaciones.length === 0 && (
          <CardMedia
            component="img"
            height="100%"
            image={
              "https://media1.giphy.com/media/grNkIEN4dkiMXFLIE9/giphy.gif?cid=ecf05e47pwghj643aw5toq6k3k7x7nouidthzr35guhmpv84&rid=giphy.gif&ct=s"
            }
            alt="loading"
          />
        )}
      </Stack>
      <Box sx={{ width: "100%", mt: "5%" }}>
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
        >
          {currentRecaudaciones &&
            currentRecaudaciones.map((recaudacion) => (
              <Grid
                item
                xs={4}
                sm={8}
                md={4}
                lg={4}
                key={recaudacion.id}
                sx={{ margin: "auto" }}
              >
                <CardTaxi
                  tipo={"recaudacion"}
                  dia={recaudacion.dia}
                  gnc={recaudacion.gnc}
                  kilometros={recaudacion.kilometros}
                  totalNeto={recaudacion.totalNeto}
                  porcentajeChofer={recaudacion.porcentajeChofer}
                  total={recaudacion.total}
                  gastoExtra={recaudacion.gastoExtra}
                  chofer={recaudacion.chofer}
                  turno={recaudacion.turno}
                  usuario={usuario.email}
                  variable={"recaudacion"}
                  id={recaudacion.id}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      {currentRecaudaciones.length !== 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "5%" }}>
          <Paginado
            productoPorPagina={productoPorPagina}
            productos={recaudaciones.length}
            paginado={paginado}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </Box>
      )}
      <ToastContainer />
    </>
  );
}
