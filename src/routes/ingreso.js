const express = require('express');
const router = express.Router();

const pool = require('../database');


router.post('/', async (req,res) =>{
    const {user, password} = req.body;
    console.log(req.body);
    const empleado = await pool.query('SELECT * FROM empleados where username = ? and password = ?',[user,password]);
    res.json(empleado);
    console.log(user,password);
});

router.get('/', async (req,res) =>{
    const pacientes = await pool.query('SELECT * FROM empleados');
    res.json(pacientes);
});

module.exports = router; 