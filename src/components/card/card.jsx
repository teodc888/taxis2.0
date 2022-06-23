import * as React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Box,
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
  getChoferesFirebase,
} from "../../redux/actions/index";

//Router
import { useNavigate } from "react-router";

//Pop up
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  titulo,
  numero,
  texto,
  col
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Pop up
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const eliminar = async (id) => {
    await deleteDoc(doc(db, `${usuario} ${variable}`, id));
    setOpen(false);
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

  const handleEditarChofer = () => {
    navigate(`/editarChofer/${id}`);
  };

  const handleEditarRecaudacion = () => {
    navigate(`/editarRecaudacion/${id}`);
  };

  const handleEditarChoque = () => {
    navigate(`/editarChoque/${id}`);
  };

  return (
    <>
      {tipo === "chofer" ? (
        <Card
          sx={{
            maxWidth: 400,
            margin: "auto",
            textTransform: "capitalize",
            transition: "all 0.3s ease-in-out",
            ":hover": { transform: "scale(1.1)" },
            borderRadius: "20px",
            boxShadow: "0px 0px 1 0px #37474f",
          }}
        >
          <Button
            sx={{ position: "absolute", borderRadius: "10px" }}
            variant="contained"
            color="error"
            onClick={handleClickOpen}
          >
            <ClearIcon />
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              {`Estas seguro que quieres eliminar a ${nombre} ${apellido}?`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Si precionas el boton eliminar se eliminara de la base de datos
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => eliminar(id)}>Eliminar</Button>
              <Button onClick={handleClose}>Cancelar</Button>
            </DialogActions>
          </Dialog>
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
            <Button
              variant="contained"
              color="success"
              sx={{ mt: "5%" }}
              onClick={handleEditarChofer}
            >
              Editar Chofer
            </Button>
          </CardContent>
        </Card>
      ) : tipo === "recaudacion" ? (
        <Card
          sx={{
            maxWidth: 400,
            margin: "auto",
            textTransform: "capitalize",
            transition: "all 0.3s ease-in-out",
            ":hover": { transform: "scale(1.1)" },
            borderRadius: "20px",
          }}
        >
          <Button
            sx={{ float: "right" }}
            variant="contained"
            color="error"
            onClick={handleClickOpen}
          >
            <ClearIcon />
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              {`Estas seguro que quieres eliminar la recaudacion de ${chofer} del dia ${dia} turno ${turno}?`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Si precionas el boton eliminar se eliminara de la base de datos
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => eliminar(id)}>Eliminar</Button>
              <Button onClick={handleClose}>Cancelar</Button>
            </DialogActions>
          </Dialog>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "yellow" }} aria-label="recipe"></Avatar>
            }
            sx={{ textTransform: "capitalize" }}
            title={chofer}
          />
          <CardContent>
            <Box sx={{ textAlign: "center" }}>
              <Typography gutterBottom variant="h4" component="div">
                {dia}
              </Typography>
            </Box>
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
            <Button
              variant="contained"
              color="success"
              sx={{ mt: "5%" }}
              onClick={handleEditarRecaudacion}
            >
              Editar Recaudacion
            </Button>
          </CardContent>
        </Card>
      ) : tipo === "choque" ? (
        <>
          <Card
            sx={{
              maxWidth: 400,
              margin: "auto",
              textTransform: "capitalize",
              transition: "all 0.3s ease-in-out",
              ":hover": { transform: "scale(1.1)" },
              borderRadius: "20px",
            }}
          >
            <Button
              sx={{ float: "right" }}
              variant="contained"
              color="error"
              onClick={handleClickOpen}
            >
              <ClearIcon />
            </Button>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                {`Estas seguro que quieres eliminar el choque de ${chofer} del dia ${dia} ?`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Si precionas el boton eliminar se eliminara de la base de
                  datos
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => eliminar(id)}>Eliminar</Button>
                <Button onClick={handleClose}>Cancelar</Button>
              </DialogActions>
            </Dialog>
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
                Nombre: {nombre} {apellido}
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
              <Button
                variant="contained"
                color="success"
                sx={{ mt: "5%" }}
                onClick={handleEditarChoque}
              >
                Editar Choque
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card sx={{ maxWidth: 400, margin: "auto", bgcolor:col, color:texto }}>
          <CardContent>
            <Typography variant="body2" component="div" >
              {titulo}
            </Typography>
            <Typography variant="h5">{numero}</Typography>
            <Typography variant="body2" component="div" >
              cantidad de {titulo}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
