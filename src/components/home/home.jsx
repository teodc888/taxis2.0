import React from "react";

import { Stack, Card, CardMedia, Button, Grid, Box } from "@mui/material";

//components
import CardTaxi from "../card/card";

//imagen
import Portada from "../../image/portada.png";

export default function Home() {
  return (
    <div>
      <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
        <Card sx={{ width: "100%", mt: "1%" }}>
          <CardMedia
            component="img"
            height="100%"
            image={Portada}
            alt="green iguana"
            sx={{ objectFit: "contain" }}
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
