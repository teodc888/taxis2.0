import React from "react";

//Mui
import { Stack, Card, CardMedia, Button, Grid, Box } from "@mui/material";

//router
import { useNavigate } from "react-router-dom";

//components
import CardTaxi from "../card/card";

//imagen
import Portada from "../../image/portada.png";
import Portada1 from "../../image/portada1.png";

export default function Home() {
  const navigate = useNavigate();

  const handleRecaudacion = () => {
    navigate("/mostrarRecaudacion");
  };

  const handleChoferes = () => {
    navigate("/mostrarChofer");
  };

  const handleChoque = () => {
    navigate("/mostrarChoque");
  };

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
          <Grid
            container
            spacing={{ xs: 3, md: 6 }}
            columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
          >
            <Grid item xs={4} sm={8} md={5.33} lg={5.33}>
              <Button
                variant="contained"
                color="error"
                sx={{
                  width: "100%",
                  height: "50px",
                  bgcolor: "#212121",
                  color: "white",
                }}
                onClick={handleRecaudacion}
              >
                RECAUDACIONES
              </Button>
            </Grid>
            <Grid item xs={4} sm={8} md={5.33} lg={5.33}>
              <Button
                variant="contained"
                color="error"
                sx={{
                  width: "100%",
                  height: "50px",
                  bgcolor: "#212121",
                  color: "white",
                }}
                onClick={handleChoferes}
              >
                CHOFERES
              </Button>
            </Grid>
            <Grid item xs={4} sm={8} md={5.33} lg={5.33}>
              <Button
                variant="contained"
                color="error"
                sx={{
                  width: "100%",
                  height: "50px",
                  bgcolor: "#212121",
                  color: "white",
                }}
                onClick={handleChoque}
              >
                CHOQUES
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: "100%", mt: "5%" }}>
          <Grid
            container
            spacing={{ xs: 3, md: 6 }}
            columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
          >
            <Grid item xs={4} sm={8} md={5.33} lg={4}>
              <CardTaxi />
            </Grid>
            <Grid item xs={4} sm={8} md={5.33} lg={4}>
              <CardTaxi />
            </Grid>
            <Grid item xs={4} sm={8} md={5.33} lg={4}>
              <CardTaxi />
            </Grid>
            <Grid item xs={4} sm={8} md={5.33} lg={4}>
              <CardTaxi />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </div>
  );
}
