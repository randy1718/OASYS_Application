const express = require('express');
const router = express.Router();

const pool = require('../database');


router.get('/', async (req,res) =>{
    const pacientes = await pool.query('SELECT idPaciente,fullname FROM pacientes');
    res.json(pacientes);
});

module.exports = router; 