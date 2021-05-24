const express = require("express");
const router = express.Router();

const pool = require("../database");

/*router.get('/add',(req,res) => {
    res.render('citas/add');
});
*/

router.post("/", async (req, res) => {
  //res.send('recibido');
  const {
    fullnamePaciente,
    idTipoDNI,
    dni,
    idGenero,
    idMedioContacto,
    email,
    cellphone,
    birthDate,
  } = req.body;
  const newPaciente = {
    dni,
    idTipoDNI,
    idGenero,
    fullnamePaciente,
    email,
    cellphone,
    birthDate,
    idMedioContacto,
  };
  await pool.query("INSERT INTO pacientes set ?", [newPaciente]);
  console.log(newPaciente);
  console.log(req.body);
  req.flash("success", "Paciente creado correctamente!");
  res.json("¡Paciente creado correctamente!");
});

router.get("/", async (req, res) => {
  const pacientes = await pool.query(
    "SELECT * FROM pacientes INNER JOIN mediocontactopreferencial ON pacientes.idMedioContacto = mediocontactopreferencial.idmedioContacto"
  );
  res.json(pacientes);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM pacientes WHERE idPaciente = ?", [id]);
  res.json("¡Paciente eliminado correctamente!");
});

router.get("/update/:id", async (req, res) => {
    const { id } = req.params;
    const paciente = await pool.query("SELECT * FROM pacientes WHERE idPaciente = ?", [id]);
    res.json(paciente);
  });

router.put("/update/:id", async (req, res) => {
  const {
    fullnamePaciente,
    idTipoDNI,
    dni,
    idGenero,
    idMedioContacto,
    email,
    cellphone,
    birthDate,
    _id,
  } = req.body;
  console.log(req.body);
  const updatedPaciente = {
    fullnamePaciente,
    idTipoDNI,
    dni,
    idGenero,
    idMedioContacto,
    email,
    cellphone,
    birthDate,
  };

  await pool.query("UPDATE pacientes set ? WHERE idPaciente = ?", [
    updatedPaciente,
    _id,
  ]);
  res.json("¡Paciente modificado correctamente!");
});

module.exports = router;
