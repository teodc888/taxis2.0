import React, { useEffect } from "react";

//Mui
import { Grid, Box } from "@mui/material";

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

  console.log(choques);

  useEffect(() => {
    if (autenticacion === true) {
      dispatch(getChoquesFirebase(usuario.email));
    }
  }, [dispatch, autenticacion, usuario]);

  return (
    <>
      <Box sx={{ width: "100%", mt: "1%" }}>
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
        >
          {choques &&
            choques.map((choques) => (
              <Grid item xs={4} sm={8} md={16} lg={16} key={choques.id}>
                <CardTaxi
                  dia={choques.dia}
                  nombre={choques.nombre}
                  apellido={choques.apellido}
                  dni={choques.dni}
                  marca={choques.marca}
                  telefono={choques.telefono}
                  poliza={choques.poliza}
                  seguro={choques.seguro}
                  placa={choques.placa}
                  fotos={choques.fotos}
                  tipo="choque"
                  chofer={choques.chofer}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
