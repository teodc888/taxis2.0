import * as React from "react";

//react
import { useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { verificarAutenticacion } from "../../redux/actions/index";

//firebase
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

//Swal
import Swal from "sweetalert2";

//router
import { useNavigate } from "react-router-dom";

//Mui
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Checkbox,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemIcon,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import HomeIcon from "@mui/icons-material/Home";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CarCrashIcon from "@mui/icons-material/CarCrash";

//Slider
import { Link } from "react-router-dom";

const menuItems = [
  { listIcon: <HomeIcon />, listText: "Home", listPath: "/" },
  {
    listIcon: <LocalTaxiIcon />,
    listText: "Agregar Chofer",
    listPath: "/crearChofer",
  },
  {
    listIcon: <LocalTaxiIcon />,
    listText: "Mostrar Choferes",
    listPath: "/mostrarChofer",
  },
  {
    listIcon: <AttachMoneyIcon />,
    listText: "Agregar Recaudaciones",
    listPath: "/crearRecaudacion",
  },
  {
    listIcon: <AttachMoneyIcon />,
    listText: "Mostrar Recaudacion",
    listPath: "/mostrarRecaudacion",
  },
  {
    listIcon: <CarCrashIcon />,
    listText: "Agregar Choque",
    listPath: "/crearChoque",
  },
  {
    listIcon: <CarCrashIcon />,
    listText: "Mostrar Choques",
    listPath: "/mostrarChoque",
  },
];

export default function Navbar({ setMode, setCargando }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //dark mode
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [setMode]
  );

  //Slidedr
  const modo = useSelector((state) => state.darkMode);

  // funcion para slider dark mode
  const handleDarkModeBG = () => {
    if (modo === "light") {
      return "white";
    } else {
      return "black";
    }
  };
  const handleDarkModeLetras = () => {
    if (modo === "light") {
      return "black";
    } else {
      return "white";
    }
  };

  const [open, setOpen] = useState(false);

  const sideList = () => (
    <Box
      sx={{ background: handleDarkModeBG(), width: 300, height: "100%" }}
      component="div"
    >
      <Avatar
        sx={{
          display: "block",
          margin: "1rem auto",
          width: 100,
          height: 100,
        }}
        src={"https://cdn-icons-png.flaticon.com/512/1801/1801444.png"}
        alt="Taxis"
      />
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary={"TAXIS"} />
        </ListItem>
        {menuItems.map((item, i) => (
          <ListItem
            button
            key={i}
            sx={{ color: "#ffc400" }}
            onClick={() => setOpen(false)}
            component={Link}
            to={item.listPath}
          >
            <ListItemIcon sx={{ color: "#ffc400" }}>
              {item.listIcon}
            </ListItemIcon>
            <ListItemText
              primary={item.listText}
              sx={{ color: handleDarkModeLetras() }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  //funcion para cerrar sesion

  const autenticacion = useSelector((state) => state.autenticacion);
  const usuario = useSelector((state) => state.usuario);

  useEffect(() => {
    if (usuario === null) {
      dispatch(verificarAutenticacion(false));
    }
  }, [dispatch, usuario]);

  const handleLogout = async () => {
    setCargando(false);
    dispatch(verificarAutenticacion(false));
    navigate("/");
    try {
      await signOut(auth);
      navigate("/");
      dispatch(verificarAutenticacion(false));
      Swal.fire({
        text: "Sesión cerrada",
        confirmButtonText: "Ok",
        icon: "success",
        timer: 2500,
        width: "auto",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "NO se pudo cerrar la sesion",
        confirmButtonText: "Ok",
        icon: "error",
        timer: 2500,
        width: "auto",
      });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "#ffc400", color: "black" }}>
        <Toolbar>
          {autenticacion ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                TAXIS
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                BIENVENIDOS
              </Typography>
            </>
          )}
          <Checkbox
            icon={<Brightness4Icon sx={{ color: "black" }} />}
            checkedIcon={<Brightness4OutlinedIcon sx={{ color: "black" }} />}
            onClick={colorMode.toggleColorMode}
          />
          {autenticacion && (
            <>
              <Button
                variant="contained"
                color="error"
                sx={{
                  ml: "1%",
                  border: "1px solid black",
                  borderRadius: "10px",
                  fontSize: {
                    xs: "0.5rem",
                    sm: "0.7rem",
                    md: "0.9rem",
                    lg: "0.9rem",
                  },
                }}
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Slider lateral */}
      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        {sideList()}
      </Drawer>
    </Box>
  );
}
