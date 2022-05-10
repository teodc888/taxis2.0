import React from "react";

import { Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <div>
      <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
        <Typography variant="h4">
          Bienvenidos 
        </Typography>
      </Stack>
    </div>
  );
}
