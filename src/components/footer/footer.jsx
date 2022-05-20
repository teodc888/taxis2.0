import React from "react";

import { Grid, Box, Link, Typography } from "@mui/material";


//Fab
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import ShareIcon from "@mui/icons-material/Share";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';



//Prueba
import Store from "../../redux/store/index";
const { persistor } = Store;

export default function Footer() {

  const handleClickReset = () => {
    window.scrollTo(0, 0);
    persistor.purge();
    window.location.reload();
  };
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.secondary"
        color="white"
        sx={{ marginTop: "5%", bgcolor: "#ffc400", color:"black" }}
      >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Box borderBottom={1} textAlign="center">
                <DirectionsCarIcon sx={{color:"#4fc3f7"}} /> TAXIS
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <AccessibilityNewIcon sx={{color:"#4fc3f7"}} /> Nosotros
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <AccountCircleIcon sx={{color:"#4fc3f7"}} /> cerrar sesion
                </Link>
              </Box>
              <Box onClick={handleClickReset}>
                <Link color="inherit">
                  <RestartAltIcon sx={{color:"#4fc3f7"}} /> Reset
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box borderBottom={1} textAlign="center">
                <ShareIcon sx={{color:"white"}} /> Redes
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    style={{
                      color: "white",
                      fontSize: "20px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "40%",
                      backgroundColor: "#25d366",
                    }}
                  />{" "}
                  Whatsapp
                </Link>
              </Box>
              <Box>
                <Link href="https://www.instagram.com/" color="inherit">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    style={{
                      color: "white",
                      fontSize: "20px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "40%",
                      background:
                        "linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)",
                    }}
                  />{" "}
                  Instagram
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{
                      color: "white",
                      fontSize: "20px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "40%",
                      background: "#3b5998",
                    }}
                  />{" "}
                  Facebook
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box
            textAlign="center"
            pt={{ xs: 5, sm: 10 }}
            pb={{ xs: 5, sm: 0 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography
              variant="h6"
              color="textPrimary"
              sx={{ mt: "0.5%", color: "white" }}
            >
             CASTROS TAXIS &reg; {new Date().getFullYear()}
            </Typography>
          </Box>
      </Box>
    </footer>
  );
}
