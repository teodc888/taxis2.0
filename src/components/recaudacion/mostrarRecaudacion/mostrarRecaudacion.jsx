import React, { useEffect, useState } from "react";

//Mui
import { Grid, Box, Stack, Typography, Button } from "@mui/material";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { getRecaudacionesFirebase } from "../../../redux/actions/index";

import { ToastContainer } from "react-toastify";

//Componentes
import CardTaxi from "../../card/card";
import Paginado from "../../paginado/paginado";

export default function MostrarRecaudacion() {
  const dispatch = useDispatch();

  const autenticacion = useSelector((state) => state.autenticacion);
  const usuario = useSelector((state) => state.usuario);

  const recaudaciones = useSelector((state) => state.recaudaciones);

  useEffect(() => {
    if (autenticacion === true) {
      dispatch(getRecaudacionesFirebase(usuario.email));
    }
  }, [dispatch, autenticacion, usuario]);

  // Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [productoPorPagina] = useState(6);
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

  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Typography variant="h4">Recaudaciones</Typography>
        <Box sx={{ width: "100%", mt: "1%" }}>
          <Grid
            container
            spacing={{ xs: 3, md: 6 }}
            columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
          >
            <Grid item xs={4} sm={8} md={4} lg={4}>
              <Button variant="contained" color="primary" fullWidth>
                Turno 1
              </Button>
            </Grid>
            <Grid item xs={4} sm={8} md={4} lg={4}>
              <Button variant="contained" color="primary" fullWidth>
                Turno 1
              </Button>
            </Grid>
            <Grid item xs={4} sm={8} md={4} lg={4}>
              <Button variant="contained" color="primary" fullWidth>
                Turno 1
              </Button>
            </Grid>
            <Grid item xs={4} sm={8} md={4} lg={4}>
              <Button variant="contained" color="primary" fullWidth>
                Turno 1
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Paginado
          productoPorPagina={productoPorPagina}
          productos={recaudaciones.length}
          paginado={paginado}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Stack>
      <Box sx={{ width: "100%", mt: "1%" }}>
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
        >
          {currentRecaudaciones &&
            currentRecaudaciones.map((recaudacion) => (
              <Grid item xs={4} sm={8} md={8} lg={8} key={recaudacion.id}>
                <CardTaxi
                  tipo={"recaudacion"}
                  dia={recaudacion.dia}
                  gnc={recaudacion.gnc}
                  kilometros={recaudacion.kilometros}
                  total={recaudacion.total}
                  gastoExtra={recaudacion.gastoExtra}
                  chofer={recaudacion.chofer}
                  turno={recaudacion.turno}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      <ToastContainer />
    </>
  );
}
