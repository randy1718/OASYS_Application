const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add',(req,res) => {
    res.render('citas/add');
});

router.post('/add', async (req,res) =>{
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
    //await pool.query("INSERT INTO pacientes set dni:'12345678',idTipoDNI:'1',idGenero:'1',fullname:'Randyy',email:'randy@gmail.com',cellphone:'30567422412',birthDate:'2021-04-04',idMedioContacto: '1'");
    console.log(newPaciente);
    console.log(req.body);
    res.json('received');
});


router.get('/', async (req,res) =>{
    const pacientes = await pool.query('SELECT * FROM pacientes');
    console.log(pacientes);
    res.send('Pacientes iran aqui!');
});

module.exports = router; 