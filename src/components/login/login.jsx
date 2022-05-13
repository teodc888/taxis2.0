import * as React from "react";

//React
import { useState } from "react";

//Router
import { useNavigate } from "react-router";

//Mui
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

//firebase
import { auth } from "./../../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

//Swal
import Swal from "sweetalert2";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Mateo Dellacqua Castro
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  // cargamos los inputs en cada estado
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setCorreo(e.target.value);
    } else if (e.target.name === "password") {
      setContraseña(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // enviamos los datos a firebase
      await signInWithEmailAndPassword(auth, correo, contraseña);
      Swal.fire({
        text: "Se ha logueado con exito",
        confirmButtonText: "Ok",
        icon: "success",
        timer: 2500,
        width: "auto",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "Error, no se pudo loguear ",
        confirmButtonText: "Ok",
        icon: "error",
        timer: 2500,
        width: "auto",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
      Swal.fire({
        text: "Se ha logueado con exito",
        confirmButtonText: "Ok",
        icon: "success",
        timer: 2500,
        width: "auto",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "Error, no se pudo loguear",
        confirmButtonText: "Ok",
        icon: "error",
        timer: 2500,
        width: "auto",
      });
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Grid container component="main" sx={{ height: "90vh", mt: "1%" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://media2.giphy.com/media/qhoJO39I5NGrMXsw9L/giphy.gif?cid=ecf05e47h6qbsbjx72fc1xbuu3vwp5ca7fyk5uqecmmd6wcm&rid=giphy.gif&ct=g)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#ffd600", color: "black" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Mail"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Button sx={{ fontSize: "13px" }} onClick={handleGoogleLogin}>
                  Iniciar Sesión con Google
                </Button>
              </Grid>
              <Grid item>
                <Button sx={{ fontSize: "13px" }} onClick={handleRegister}>
                  "No tienes cuenta? Crear Una!"
                </Button>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
