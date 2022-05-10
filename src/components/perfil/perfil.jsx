import React from "react";

//Mui
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Stack,
  Avatar,
} from "@mui/material";

//redux
import { useSelector } from "react-redux";

export default function Perfil() {

  const usuario = useSelector((state) => state.usuario);
  console.log(usuario);

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Card sx={{ width: "95%" }}>
        <CardActionArea>
          <Avatar
            alt="Remy Sharp"
            src={usuario.photoURL}
            sx={{
              width: "200px",
              height: "200px",
              display: "block",
              position: "absolute",
              bottom: "15%",
              right: "83%",
              zIndex: "3",
            }}
          />
          <CardMedia
            component="img"
            height="500"
            image="https://static3.depositphotos.com/1006458/211/i/450/depositphotos_2111331-stock-photo-fast-taxi.jpg"
            alt="green iguana"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {usuario.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {usuario.email}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
}
