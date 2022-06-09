import React, { useEffect } from "react";

//Mui
import { Grid, Box, CardMedia, Typography } from "@mui/material";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { getChoferesFirebase } from "../../../redux/actions/index";

//Componentes
import CardTaxi from "../../card/card";

export default function MostrarChofer() {
  const dispatch = useDispatch();

  const autenticacion = useSelector((state) => state.autenticacion);
  const usuario = useSelector((state) => state.usuario);

  const choferes = useSelector((state) => state.choferes);

  useEffect(() => {
    if (autenticacion === true) {
      dispatch(getChoferesFirebase(usuario.email));
    }
  }, [dispatch, autenticacion, usuario]);

  return (
    <>
      <Box sx={{ width: "100%", mt: "1%" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom sx={{ mb: "2%" }}>
            CHOFERES
          </Typography>
        </Box>
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
        >
          {choferes.length > 0 ? (
            choferes.map((chofer) => (
              <Grid
                item
                xs={4}
                sm={8}
                md={4}
                lg={4}
                key={chofer.id}
                sx={{ margin: "auto" }}
              >
                <CardTaxi
                  imagen={
                    chofer.imagen
                      ? chofer.imagen
                      : "https://iconarchive.com/download/i102645/graphicloads/flat-finance/person.ico"
                  }
                  nombre={chofer.nombre}
                  apellido={chofer.apellido}
                  documento={chofer.documento}
                  fdv={chofer.fdv}
                  telefono={chofer.telefono}
                  carnet={chofer.carnet}
                  tipo="chofer"
                  fechaDeNacimiento={chofer.fechaDeNacimiento}
                  usuario={usuario.email}
                  variable={"chofer"}
                  id={chofer.id}
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
