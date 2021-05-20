const express = require('express');
const router = express.Router();

const pool = require('../database');

/*router.get('/add',(req,res) => {
    res.render('citas/add');
});
*/

router.post('/', async (req,res) =>{
    //res.send('recibido');
    const {fullname,idTipoDNI, dni,idGenero,idMedioContacto, email, cellphone, birthDate} = req.body;
    const newPaciente = {
        dni,
        idTipoDNI,
        idGenero,
        fullname,
        email,
        cellphone,
        birthDate,
        idMedioContacto
    };
    await pool.query("INSERT INTO pacientes set ?",[newPaciente]);
    console.log(newPaciente);
    console.log(req.body);
    req.flash('success','Paciente creado correctamente!');
    res.json('received');
});

router.get('/', async (req,res) =>{
    const pacientes = await pool.query('SELECT * FROM pacientes');
    res.json(pacientes);
});

module.exports = router; 