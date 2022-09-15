import { Button, TextField } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";
import { postRegistro } from "./Endpoints";
import axios from "axios";

function Formulario() {
  const [datos, setDatos] = React.useState({ nombre: "" });

  const onChangeTextUser = (e) =>
    setDatos({ ...datos, [e.target.name]: e.target.value });

  const registrar = async () => {
    axios
      .post(postRegistro, datos)
      .then((data) => {
        data = data.data;
        Swal.fire({
          title: data.status != 200 ? "Error!" : "Exito!",
          text: datos.nombre + " - " + data.msg,
          icon: data.status != 200 ? "error" : "success",
          confirmButtonText: "Ok",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Error de conexion",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <div>
      <h1>Formulario de asistencia</h1>
      <div style={{ paddingBottom: 5 }}>
        <TextField
          id="nombre"
          name="nombre"
          label="Nombre"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => onChangeTextUser(e)}
        />
      </div>
      <div>
        <Button
          variant="contained"
          style={{ width: "100%" }}
          onClick={registrar}
        >
          Registrar
        </Button>
      </div>
    </div>
  );
}

export default Formulario;
