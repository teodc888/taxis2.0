import "./App.css";
import * as React from "react";

//react
import { useEffect, useState } from "react";

//Mui
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  darkModee,
  verificarAutenticacion,
  getUsuario,
} from "./redux/actions/index";

//Route
import { Routes, Route } from "react-router-dom";

//firebase
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// import { addDoc, collection } from "firebase/firestore";

//Tost
import { ToastContainer } from "react-toastify";

//Components
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import CrearChofer from "./components/chofer/crearChofer/crearChofer";
import MostrarChofer from "./components/chofer/mostrarChofer/mostrarChofer";
import CrearRecaudacion from "./components/recaudacion/crearRecaudacion/crearRecaudacion";
import MostrarRecaudacion from "./components/recaudacion/mostrarRecaudacion/mostrarRecaudacion";
import Perfil from "./components/perfil/perfil";
import CrearChoque from "./components/choques/crearChoque/crearChoque";
import MostrarChoque from "./components/choques/mostrarChoque/mostrarChoque";
import Footer from "./components/footer/footer";
import EditarChofer from "./components/chofer/editarChofer/editarChofer";
import EditarRecaudacion from "./components/recaudacion/editarRecaudacion/editarRecaudacion";

function App() {
  const dispatch = useDispatch();

  //modo dark
  const modo = useSelector((state) => state.darkMode);
  const [mode, setMode] = useState(modo);
  dispatch(darkModee(mode));

  const theme = React.useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: `'Open Sans', sans-serif `,
          fontSize: 14,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
        },
        palette: {
          mode,
        },
      }),
    [mode]
  );

  //user
  const autenticacion = useSelector((state) => state.autenticacion);
  const usuario = useSelector((state) => state.usuario);

  useEffect(() => {
    setTimeout(() => {
      if (autenticacion === false) {
        onAuthStateChanged(auth, (users) => {
          dispatch(getUsuario(users));
        });
      }
    }, 300);
    if (usuario !== null) {
      dispatch(verificarAutenticacion(true));
    } else {
      dispatch(verificarAutenticacion(false));
    }
  }, [autenticacion, dispatch, usuario]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar setMode={setMode} />
        <Container maxWidth="xl">
          <Routes>
            {autenticacion === false ? (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/crearChofer" element={<CrearChofer />} />
                <Route path="/mostrarChofer" element={<MostrarChofer />} />
                <Route
                  path="/crearRecaudacion"
                  element={<CrearRecaudacion />}
                />
                <Route
                  path="/mostrarRecaudacion"
                  element={<MostrarRecaudacion />}
                />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/crearChoque" element={<CrearChoque />} />
                <Route path="/mostrarChoque" element={<MostrarChoque />} />
                <Route path="/editarChofer/:id" element={<EditarChofer />} />
                <Route
                  path="/editarRecaudacion/:id"
                  element={<EditarRecaudacion />}
                />
              </>
            )}
          </Routes>
        </Container>
        <Footer />
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
