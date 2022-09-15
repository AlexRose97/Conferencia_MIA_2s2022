import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getListado } from "./Endpoints";
import axios from "axios";

function Listado() {
  const [rows, setRows] = React.useState([{ nombre: "--", fecha: "--" }]);

  //####################################################
  const getListadoRegistro = async () => {
    axios
      .get(getListado)
      .then((data) => {
        if (data.data) {
          console.log(data.data.usuarios);
          setRows(data.data.usuarios);
        }
      })
      .catch(() => {
        console.log("Error Conexion " + url);
      });
  };
  //####################################################
  React.useEffect(() => {
    const timeOut = setInterval(() => {
      getListadoRegistro();
    }, 3000);
    getListadoRegistro();
    return () => clearInterval(timeOut);
  }, []);

  return (
    <div>
      <h1>Listado de asistencia</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Fecha de registro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.nombre}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nombre}
                </TableCell>
                <TableCell align="right">{row.fecha}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Listado;
