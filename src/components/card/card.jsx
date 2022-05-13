import * as React from "react";

import {
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
} from "@mui/material";

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
  gastoExtra,
  dni,
  fotos,
  marca,
  placa,
  poliza,
  seguro,
  chofer,
}) {
  return (
    <>
      {tipo === "chofer" ? (
        <Card sx={{ maxWidth: 400, margin: "auto", borderRadius: "5%" }}>
          <CardMedia
            component="img"
            height="240"
            image={imagen}
            alt="usuario"
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textTransform: "capitalize" }}
            >
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
        </Card>
      ) : tipo === "recaudacion" ? (
        <Card sx={{ maxWidth: 400, margin: "auto" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "yellow" }} aria-label="recipe"></Avatar>
            }
            title={chofer}
          />

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
        </Card>
      ) : tipo === "choque" ? (
        <>
          <Card sx={{ maxWidth: 400, margin: "auto" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={fotos}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Dia {dia}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {nombre} {apellido}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Documento: {dni}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Telefono: {telefono}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Seguro: {seguro}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Poliza: {poliza}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Marca: {marca}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Placa: {placa}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </>
      ) : (
        <Card sx={{ maxWidth: 400 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image="https://es.seaicons.com/wp-content/uploads/2015/06/Bar-chart-icon.png"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Graficos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                numero
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
}
