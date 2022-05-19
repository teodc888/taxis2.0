import * as React from "react";

//react
import { useState } from "react";

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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CarCrashIcon from "@mui/icons-material/CarCrash";

//Slider
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//Stilos para slider
const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 312,
    background: "black",
    height: "100%",
  },
  avatar: {
    display: "block",
    margin: "1rem auto",
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  listItem: {
    color: "#ffc400",
  },
  listText: {
    color: "white",
  },
}));

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

export default function Navbar({ setMode }) {
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

  const classes = useStyles();

  const sideList = () => (
    <Box
      sx={{ background: handleDarkModeBG(), width: 312, height: "100%" }}
      component="div"
    >
      <Avatar
        className={classes.avatar}
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
            className={classes.listItem}
            onClick={() => setOpen(false)}
            component={Link}
            to={item.listPath}
          >
            <ListItemIcon className={classes.listItem}>
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

  const handleLogout = async () => {
    navigate("/");
    setTimeout(async () => {
      try {
        await signOut(auth);
        dispatch(verificarAutenticacion(false));
        console.log("cerrado");
        Swal.fire({
          text: "Sesión cerrada",
          confirmButtonText: "Ok",
          icon: "success",
          timer: 2500,
          width: "auto",
        });
        navigate("/");
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
    }, 1000);
  };

  const handlePerfil = () => {
    navigate("/perfil");
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
            sx={{ mr: "1%" }}
          />
          {autenticacion && (
            <>
              <IconButton
                color="inherit"
                aria-label="login"
                onClick={handlePerfil}
              >
                <AccountCircleIcon />
              </IconButton>
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
