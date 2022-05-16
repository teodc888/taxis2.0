import React, { useEffect } from "react";

//Mui
import { Grid, Box } from "@mui/material";

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

  console.log(choferes);

  return (
    <>
      <Box sx={{ width: "100%", mt: "1%" }}>
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
        >
          {choferes &&
            choferes.map((chofer) => (
              <Grid item xs={4} sm={8} md={8} lg={8} key={chofer.id}>
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
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
