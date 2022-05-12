import * as React from "react";

//React
import { useState, useEffect } from "react";

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
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

//firebase
import { auth } from "./../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

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

const validateForm = (input) => {
  let error = {};
  console.log(input);
  const expReg =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  let validacion = expReg.test(input.email);

  if (!validacion) {
    error.correo = "EL mail es incorrecto";
  }

  return error;
};

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contraseña1, setContraseña1] = useState("");
  const [contraseña2, setContraseña2] = useState("");
  const [contraseña3, setContraseña3] = useState("");
  const [error, setError] = useState({});

  // cargamos los inputs en cada estado
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setCorreo(e.target.value);
      setError(validateForm({ ...correo, [e.target.name]: e.target.value }));
    } else if (e.target.name === "password1") {
      setContraseña1(e.target.value);
    } else if (e.target.name === "password2") {
      setContraseña2(e.target.value);
    }
  };

  useEffect(() => {
    if (contraseña1 === contraseña2) {
      setContraseña3(contraseña1);
    }
  }, [contraseña1, contraseña2]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, correo, contraseña3);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/");
  };

  console.log(contraseña3.length > 0);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registrarse
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
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                helperText={error.correo}
                error={error.correo ? true : false}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password"
                onChange={handleChange}
                error={contraseña3.length < 0 ? true : false}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={handleChange}
                helperText={
                  contraseña3.length === 0 && "las contraseñas no coinciden"
                }
                error={contraseña3.length < 0 ? true : false}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrarse
              </Button>
              <Grid container>
                <Grid item>
                  <Button sx={{ fontSize: "13px" }} onClick={handleLogin}>
                    Iniciar Sesión
                  </Button>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
