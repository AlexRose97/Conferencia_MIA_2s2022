import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Listado from "./Componentes/Listado";
import Formulario from "./Componentes/Formulario";

export default function App() {
  const [tab, setTab] = React.useState("1");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ejemplo
          </Typography>
          <Button color="inherit" onClick={() => setTab(1)}>
            Listado
          </Button>
          <Button color="inherit" onClick={() => setTab(2)}>
            Formulario
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {tab == 1 ? <Listado /> : <Formulario />}
      </Box>
    </Box>
  );
}
