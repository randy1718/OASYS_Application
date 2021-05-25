const express = require("express");
const router = express.Router();

const pool = require("../database");

router.post("/", async (req, res) => {
  const {
    idDoctor,
    idPaciente,
    idTipoCita,
    idEstado,
    fechaCita,
    hora,
    duracion_minutos,
  } = req.body;
  const idConfirmacion = "0";
  console.log(req.body);
  const newCita = {
    idDoctor,
    idPaciente,
    idTipoCita,
    idConfirmacion,
    idEstado,
    fechaCita,
    hora,
    duracion_minutos,
  };
  const hour = await pool.query("SELECT SEC_TO_TIME(?*60)", [duracion_minutos]);
  console.log(hour);
  const citas = await pool.query("SELECT * FROM citas wHERE hora = ? and fechaCita=?",[hora, fechaCita]);
  console.log(citas);
  const dates = await pool.query("SELECT * FROM citas wHERE fechaCita=? AND ? BETWEEN hora AND ADDTIME(hora,SEC_TO_TIME(duracion_minutos*60))",[fechaCita,hora]);
  const prueba = await pool.query('select hora, ADDTIME(hora,SEC_TO_TIME(duracion_minutos*60)) from citas');
  console.log(prueba);
  console.log('ESTAS CITAS TIENEN CONFLICTO DE HORA');
  console.log(dates);
  if (Object.keys(citas).length === 0 && Object.keys(dates).length === 0) {
    await pool.query("INSERT INTO citas set ?", [newCita]);
    console.log(newCita);
    console.log(req.body);
    req.flash("success", "Cita creada correctamente!");
    res.json("Cita creada correctamente!");
  }else{
    res.json("¡Ya existe una cita programada a esa hora!");
  }
});

router.get("/", async (req, res) => {
  const citas = await pool.query(
    "SELECT * FROM citas INNER JOIN pacientes ON citas.idPaciente = pacientes.idPaciente INNER JOIN tipoCita on citas.idTipoCita = tipoCita.idTipoCita INNER JOIN empleados ON citas.idDoctor = empleados.idEmpleado"
  );
  res.json(citas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM citas WHERE idCita = ?", [id]);
  res.json("¡Cita eliminada correctamente!");
});

router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  const cita = await pool.query("SELECT * FROM citas WHERE idCita = ?", [id]);
  res.json(cita);
});

router.put("/update/:id", async (req, res) => {
  const {
    idDoctor,
    idPaciente,
    idTipoCita,
    idEstado,
    fechaCita,
    hora,
    duracion_minutos,
    _id,
  } = req.body;

  const idConfirmacion = "0";
  console.log(req.body);
  const updatedCita = {
    idDoctor,
    idPaciente,
    idTipoCita,
    idConfirmacion,
    idEstado,
    fechaCita,
    hora,
    duracion_minutos,
  };

  if(idEstado == '1000'){
    res.json('¡Seleccione el estado de la cita!');
    console.log('No se puede actualizar la cita!');
  }else{
    await pool.query("UPDATE citas set ? WHERE idCita = ?", [updatedCita, _id]);
    res.json('¡Cita modificada correctamente!');
  }
});

module.exports = router;
