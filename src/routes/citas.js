const express = require('express');
const router = express.Router();

const pool = require('../database');


router.post('/', async (req,res) =>{
    const {idDoctor,idPaciente, idTipoCita, fechaCita, hora,duracion_minutos} = req.body;
    const idConfirmacion = "0";
    const idEstado = "0";
    console.log(req.body);
    const newCita = {
        idDoctor,
        idPaciente,
        idTipoCita,
        idConfirmacion,
        idEstado,
        fechaCita,
        hora,
        duracion_minutos
    };
    await pool.query("INSERT INTO citas set ?",[newCita]);
    console.log(newCita);
    console.log(req.body);
    req.flash('success','Cita creada correctamente!');
    res.json('received');
});

router.get('/', async (req,res) =>{
    const citas = await pool.query('SELECT * FROM citas');
    res.json(citas);
});

module.exports = router; 