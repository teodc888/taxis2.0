import React, { useEffect } from "react";

//Mui
import { Grid, Box } from "@mui/material";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { getRecaudacionesFirebase } from "../../../redux/actions/index";

//Componentes
import CardTaxi from "../../card/card";

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

  return (
    <>
      <Box sx={{ width: "100%", mt: "1%" }}>
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
        >
          {recaudaciones &&
            recaudaciones.map((recaudacion) => (
              <Grid item xs={4} sm={8} md={16} lg={16} key={recaudacion.id}>
                <CardTaxi
                  tipo={"recaudacion"}
                  dia={recaudacion.dia}
                  gnc={recaudacion.gnc}
                  kilometros={recaudacion.kilometros}
                  total={recaudacion.total}
                  gastoExtra={recaudacion.gastoExtra}
                  chofer={recaudacion.chofer}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
