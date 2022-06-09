import React, { useEffect } from "react";

//Mui
import { Grid, Box, CardMedia, Typography } from "@mui/material";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { getChoquesFirebase } from "../../../redux/actions/index";

//Componentes
import CardTaxi from "../../card/card";

export default function MostrarChoques() {
  const dispatch = useDispatch();

  const autenticacion = useSelector((state) => state.autenticacion);
  const usuario = useSelector((state) => state.usuario);

  const choques = useSelector((state) => state.choques);

  useEffect(() => {
    if (autenticacion === true) {
      dispatch(getChoquesFirebase(usuario.email));
    }
  }, [dispatch, autenticacion, usuario]);

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">CHOQUES</Typography>
      </Box>
      <Box sx={{ width: "100%", mt: "3%" }}>
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
        >
          {choques.length > 0 ? (
            choques.map((choque) => (
              <Grid item xs={4} sm={8} md={4} lg={4} key={choque.id} sx={{margin:"auto"}}>
                <CardTaxi
                  dia={choque.dia}
                  nombre={choque.nombre}
                  apellido={choque.apellido}
                  dni={choque.dni}
                  marca={choque.marca}
                  telefono={choque.telefono}
                  poliza={choque.poliza}
                  seguro={choque.seguro}
                  placa={choque.placa}
                  imagenes={choque.imagenes}
                  tipo="choque"
                  chofer={choque.chofer}
                  usuario={usuario.email}
                  variable={"choque"}
                  id={choque.id}
                />
              </Grid>
            ))
          ) : (
            <CardMedia
              component="img"
              height="100%"
              image={
                "https://media1.giphy.com/media/grNkIEN4dkiMXFLIE9/giphy.gif?cid=ecf05e47pwghj643aw5toq6k3k7x7nouidthzr35guhmpv84&rid=giphy.gif&ct=s"
              }
              alt="loading"
            />
          )}
        </Grid>
      </Box>
    </>
  );
}
