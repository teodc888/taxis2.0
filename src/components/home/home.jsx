import React, { useEffect } from "react";

//Mui
import {
  Stack,
  Card,
  CardMedia,
  Button,
  Grid,
  Box,
  Typography,
} from "@mui/material";

//router
import { useNavigate } from "react-router-dom";

//imagen
import Portada from "../../image/portada.png";
import Portada1 from "../../image/portada1.png";

//components
import CardTaxi from "../card/card";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  getRecaudacionesFirebase,
  getChoferesFirebase,
  getChoquesFirebase,
} from "../../redux/actions/index";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Rutas
  const handleRecaudacion = (e) => {
    e === "mostrar"
      ? navigate("/mostrarRecaudacion")
      : navigate("/crearRecaudacion");
  };

  const handleChoferes = (e) => {
    e === "mostrar" ? navigate("/mostrarChofer") : navigate("/crearChofer");
  };

  const handleChoque = (e) => {
    e === "mostrar" ? navigate("/mostrarChoque") : navigate("/crearChoque");
  };

  //grafico

  const autenticacion = useSelector((state) => state.autenticacion);
  const usuario = useSelector((state) => state.usuario);
  const choferes = useSelector((state) => state.choferes);
  const choques = useSelector((state) => state.choques);
  const recaudaciones = useSelector((state) => state.recaudaciones);

  useEffect(() => {
    if (autenticacion === true) {
      dispatch(getChoferesFirebase(usuario !== null ? usuario.email : null));
      dispatch(
        getRecaudacionesFirebase(usuario !== null ? usuario.email : null)
      );
      dispatch(getChoquesFirebase(usuario !== null ? usuario.email : null));
    }
  }, [dispatch, autenticacion, usuario]);

  const filtradoTotal =
    recaudaciones.length > 0 ? recaudaciones.map((total) => total.total) : 0;
  const reducer = (accumulator, curr) => accumulator + curr;
  const total = filtradoTotal.length > 0 ? filtradoTotal.reduce(reducer) : 0;

  return (
    <div>
      <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
        <Card sx={{ maxWidth: "100%", mt: "1%" }}>
          <CardMedia
            sx={{
              display: { xs: "none", sm: "block", md: "block", lg: "block" },
            }}
            component="img"
            height="100%"
            image={Portada}
            alt="green iguana"
          />
          <CardMedia
            sx={{
              display: { xs: "block", sm: "none", md: "none", lg: "none" },
            }}
            component="img"
            height="100%"
            image={Portada1}
            alt="green iguana"
          />
        </Card>

        <Box sx={{ width: "100%", mt: "1%" }}>
          <Box sx={{ textAlign: "center", mb: "2%" }}>
            <Typography variant="h4" component={"div"}>
              TAXIS
            </Typography>
          </Box>
          <Grid
            container
            spacing={{ xs: 3, md: 6 }}
            columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
          >
            <Grid item xs={2} sm={4} md={8} lg={8}>
              <Button
                variant="contained"
                color="error"
                sx={{
                  width: "100%",
                  height: "50px",
                  bgcolor: "#212121",
                  color: "white",
                  fontSize: {
                    xs: "10px",
                    sm: "13px",
                    md: "15px",
                    lg: "15px",
                  },
                }}
                onClick={() => handleRecaudacion("mostrar")}
              >
                Mostrar Recaudaciones
              </Button>
            </Grid>
            <Grid item xs={2} sm={4} md={8} lg={8}>
              <Button
                variant="contained"
                color="warning"
                sx={{
                  width: "100%",
                  height: "50px",
                  bgcolor: "#212121",
                  color: "white",
                  fontSize: {
                    xs: "10px",
                    sm: "13px",
                    md: "15px",
                    lg: "15px",
                  },
                }}
                onClick={() => handleRecaudacion("crear")}
              >
                Cargar Recaudaciones
              </Button>
            </Grid>
            <Grid item xs={2} sm={4} md={8} lg={8}>
              <Button
                variant="contained"
                color="error"
                sx={{
                  width: "100%",
                  height: "50px",
                  bgcolor: "#212121",
                  color: "white",
                  fontSize: {
                    xs: "10px",
                    sm: "13px",
                    md: "15px",
                    lg: "15px",
                  },
                }}
                onClick={() => handleChoferes("mostrar")}
              >
                Mostrar Choferes
              </Button>
            </Grid>
            <Grid item xs={2} sm={4} md={8} lg={8}>
              <Button
                variant="contained"
                color="warning"
                sx={{
                  width: "100%",
                  height: "50px",
                  bgcolor: "#212121",
                  color: "white",
                  fontSize: {
                    xs: "10px",
                    sm: "13px",
                    md: "15px",
                    lg: "15px",
                  },
                }}
                onClick={() => handleChoferes("crear")}
              >
                Cargar Choferes
              </Button>
            </Grid>
            <Grid item xs={2} sm={4} md={8} lg={8}>
              <Button
                variant="contained"
                color="error"
                sx={{
                  width: "100%",
                  height: "50px",
                  bgcolor: "#212121",
                  color: "white",
                  fontSize: {
                    xs: "10px",
                    sm: "13px",
                    md: "15px",
                    lg: "15px",
                  },
                }}
                onClick={() => handleChoque("mostrar")}
              >
                Mostrar Choques
              </Button>
            </Grid>
            <Grid item xs={2} sm={4} md={8} lg={8}>
              <Button
                variant="contained"
                color="warning"
                sx={{
                  width: "100%",
                  height: "50px",
                  bgcolor: "#212121",
                  color: "white",
                  fontSize: {
                    xs: "10px",
                    sm: "13px",
                    md: "15px",
                    lg: "15px",
                  },
                }}
                onClick={() => handleChoque("crear")}
              >
                Cargar Choques
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ textAlign: "center", mt: "2%", mb: "2%" }}>
            <Typography variant="h4" component={"div"}>
              Grafico
            </Typography>
          </Box>
          <Grid
            container
            spacing={{ xs: 3, md: 6 }}
            columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
          >
            <Grid item xs={4} sm={8} md={5.33} lg={4}>
              <CardTaxi numero={choferes.length} titulo="Choferes" />
            </Grid>
            <Grid item xs={4} sm={8} md={5.33} lg={4}>
              <CardTaxi numero={recaudaciones.length} titulo="Recaudaciones" />
            </Grid>
            <Grid item xs={4} sm={8} md={5.33} lg={4}>
              <CardTaxi numero={choques.length} titulo="Choques" />
            </Grid>
            <Grid item xs={4} sm={8} md={5.33} lg={4}>
              <CardTaxi
                numero={"$  " + total}
                titulo="Total de todas las recaudaciones"
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </div>
  );
}
