const mysql2 = require("mysql2/promise");
const express = require("express");
const app = express();
var axios = require("axios");

//funcion que procesa datos antes de que el servidor lo reciba
const morgan = require("morgan");
// puerto en el que escucha
app.set("port", process.env.PORT || 3030);
app.set("json spaces", 2);

//seguridad
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(morgan("dev"));
//app.use(express.urlencoded({extended: false}));
//app.use(express.json());

//--------------extra
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

//----------Credenciales DB
const db_credenciales = require("./credenciales");
var connProme = mysql2.createPool(db_credenciales);

//-------------Registro------------
app.post("/api/Registro", async function (req, res) {
  const { nombre } = req.body;
  try {
    //verificar si existe el usuario
    let query = "Select * from usuario where nombre=?";
    let [rows, fields] = await connProme.query(query, nombre);
    if (rows.length == 0) {
      //-----------------------------registrar en la base de datos
      //usuario
      query = "INSERT INTO usuario (nombre, fecha) VALUES (?,?);";
      [rows, fields] = await connProme.execute(query, [nombre, new Date()]);

      return res.send({
        status: 200,
        msg: "Usuario Registrado con exito",
      });
    } else {
      return res.send({
        status: 400,
        msg: "El nombre ya se encuentra registrado, intenta con otro nombre",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      msg: "Ocurrio error en el server",
    });
  }
});

//-------------Listado---------------
app.get("/api/Listado", async function (req, res) {
  try {
    let query =
      "Select nombre, DATE_FORMAT(fecha,'%d/%m/%Y - %H:%i:%s') fecha from usuario";
    let [rows, fields] = await connProme.query(query);
    return res.send({
      status: 200,
      usuarios: rows,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      msg: "Ocurrio error en el server",
      usuarios: [],
    });
  }
});

//iniciando servidor
app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`);
});
