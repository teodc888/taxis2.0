import * as React from "react";

import {
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

//components
import Carrousel from "../carrouselCard/carrouselCard";

import { db } from "../../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

//Swal
import Swal from "sweetalert2";

//redux
import { useDispatch } from "react-redux";
import {
  getRecaudacionesFirebase,
  getChoquesFirebase,
  getChoferesFirebase
} from "../../redux/actions/index";

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
  totalNeto,
  porcentajeChofer,
  gnc,
  kilometros,
  gastoExtra,
  dni,
  marca,
  placa,
  poliza,
  seguro,
  chofer,
  turno,
  fechaDeNacimiento,
  imagenes,
  id,
  usuario,
  variable,
}) {
  const dispatch = useDispatch();

  const eliminar = async (id) => {
    await deleteDoc(doc(db, `${usuario} ${variable}`, id));

    Swal.fire({
      text: "Se ah eliminado con exito",
      confirmButtonText: "Ok",
      icon: "success",
      timer: 2500,
      width: "auto",
    });

    setTimeout(() => {
      dispatch(getRecaudacionesFirebase(usuario));
      dispatch(getChoquesFirebase(usuario));
      dispatch(getChoferesFirebase(usuario));
    }, 100);
  };

  return (
    <>
      {tipo === "chofer" ? (
        <Card
          sx={{
            maxWidth: 400,
            margin: "auto",
            borderRadius: "5%",
            textTransform: "capitalize",
          }}
        >
          <Button
            sx={{ position: "absolute" }}
            variant="contained"
            color="error"
            onClick={() => eliminar(id)}
          >
            <ClearIcon />
          </Button>
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
              Fecha de nacimiento {fechaDeNacimiento}
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
        <Card
          sx={{ maxWidth: 400, margin: "auto", textTransform: "capitalize" }}
        >
          <Button
            sx={{ float: "right" }}
            variant="contained"
            color="error"
            onClick={() => eliminar(id)}
          >
            <ClearIcon />
          </Button>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "yellow" }} aria-label="recipe"></Avatar>
            }
            sx={{ textTransform: "capitalize" }}
            title={chofer}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {dia}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textTransform: "capitalize" }}
            >
              Turno: {turno}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Neto: ${totalNeto}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              35% del chofer: ${porcentajeChofer}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gnc: ${gnc}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Kilometros: {kilometros} km
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gastos Extra: ${gastoExtra}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Bruto: ${total}
            </Typography>
          </CardContent>
        </Card>
      ) : tipo === "choque" ? (
        <>
          <Card
            sx={{ maxWidth: 400, margin: "auto", textTransform: "capitalize" }}
          >
            <Button
              sx={{ float: "right" }}
              variant="contained"
              color="error"
              onClick={() => eliminar(id)}
            >
              <ClearIcon />
            </Button>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "yellow" }} aria-label="recipe"></Avatar>
              }
              title={chofer}
            />
            {imagenes.length > 0 ? (
              <Carrousel imagen={imagenes} velocidad={null} />
            ) : (
              <CardMedia
                component="img"
                height="240"
                image={
                  "https://us.123rf.com/450wm/pandavector/pandavector1601/pandavector160100984/51199829-accidente-de-coche-negro-simple-icono-en-el-fondo-blanco-para-el-dise%C3%B1o-web.jpg?ver=6"
                }
                alt="usuario"
                sx={{ objectFit: "contain" }}
              />
            )}
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
          </Card>
        </>
      ) : (
        <Card sx={{ maxWidth: 400, margin: "auto" }}>
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
