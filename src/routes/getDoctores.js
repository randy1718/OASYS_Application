const express = require('express');
const router = express.Router();

const pool = require('../database');


router.get('/', async (req,res) =>{
    const doctores = await pool.query('SELECT idEmpleado,fullname FROM empleados where idTipoEmpleado = "2" ');
    res.json(doctores);
});

module.exports = router; 