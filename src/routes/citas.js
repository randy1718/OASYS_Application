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
    const citas = await pool.query('SELECT * FROM citas INNER JOIN pacientes ON citas.idPaciente = pacientes.idPaciente INNER JOIN tipoCita on citas.idTipoCita = tipoCita.idTipoCita');
    res.json(citas);
});

router.get('/:id',async (req,res) =>{
    const {id} = req.params;
    await pool.query('DELETE FROM citas WHERE idCita = ?',[id]);
    res.json('eliminado!!!!!');
});

router.get('/update/:id',async (req,res) =>{
    const {id} = req.params;
    const cita = await pool.query('SELECT * FROM citas WHERE idCita = ?',[id]);
    res.json(cita);
});

router.put('/update/:id',async (req,res) =>{
    const {idDoctor,idPaciente, idTipoCita, fechaCita, hora,duracion_minutos,_id} = req.body;
    const idConfirmacion = "0";
    const idEstado = "0";
    console.log(req.body);
    const updatedCita = {
        idDoctor,
        idPaciente,
        idTipoCita,
        idConfirmacion,
        idEstado,
        fechaCita,
        hora,
        duracion_minutos
    };

    await pool.query("UPDATE citas set ? WHERE idCita = ?",[updatedCita,_id]);

    res.json(updatedCita);
});


module.exports = router; 