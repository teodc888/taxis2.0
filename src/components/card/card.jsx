import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function CardTaxi({
  imagen,
  nombre,
  apellido,
  documento,
  fdv,
  telefono,
  carnet,
  tipo,
  dia,
  total,
  gnc,
  kilometros,
  gastoExtra
}) {
  return (
    <>
      {tipo === "chofer" ? (
        <Card sx={{ maxWidth: 400, margin: "auto" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={imagen}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {nombre} {apellido}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Documento: {documento}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Telefono: {telefono}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Carnet {carnet}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha de vencimiento {fdv}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Card sx={{ maxWidth: 400, margin:"auto" }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {dia}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total: {total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gnc: {gnc}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kilometros: {kilometros}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Gastos Extra: {gastoExtra}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
}
