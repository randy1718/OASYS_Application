const express = require("express");
const router = express.Router();

const pool = require("../database");
const passport = require("passport");

// router.post("/",passport.authenticate("local.signup", {
//   successRedirect: "/home",
//   failureRedirect: "/",
// })
// )

router.post("/", async (req, res) => {
  const {
    fullname,
    username,
    password,
    idTipoDNI,
    dni,
    idGenero,
    idTipoEmpleado,
    email,
    cellphone,
    birthDate,
  } = req.body;
  const newEmpleado = {
    dni,
    username,
    password,
    fullname,
    email,
    cellphone,
    birthDate,
    idTipoEmpleado,
    idGenero,
    idTipoDNI,
  };
  await pool.query("INSERT INTO empleados set ?", [newEmpleado]);
  console.log(newEmpleado);
  console.log(req.body);
  req.flash("success", "Empleado creado correctamente!");
  res.json("Empleado creado correctamente!");
});

router.get("/", async (req, res) => {
  const empleados = await pool.query(
    "SELECT * FROM empleados INNER JOIN tipoEmpleado ON empleados.idTipoEmpleado = tipoEmpleado.idTipoEmpleado WHERE empleados.idTipoEmpleado <> 1"
  );
  res.json(empleados);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM empleados WHERE idEmpleado = ?", [id]);
  res.json("¡Empleado eliminado correctamente!");
});

router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  const empleado = await pool.query(
    "SELECT * FROM empleados WHERE idEmpleado = ?",
    [id]
  );
  res.json(empleado);
});

router.put("/update/:id", async (req, res) => {
  const {
    dni,
    username,
    password,
    fullname,
    email,
    cellphone,
    birthDate,
    idTipoEmpleado,
    idGenero,
    idTipoDNI,
    _id,
  } = req.body;
  console.log(req.body);
  const updatedEmpleado = {
    dni,
    username,
    password,
    fullname,
    email,
    cellphone,
    birthDate,
    idTipoEmpleado,
    idGenero,
    idTipoDNI,
  };

  await pool.query("UPDATE empleados set ? WHERE idEmpleado = ?", [updatedEmpleado,_id]);
  res.json("¡Empleado modificado correctamente!");
});

module.exports = router;
