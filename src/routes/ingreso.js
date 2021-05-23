const express = require('express');
const router = express.Router();

const pool = require('../database');
const passport = require('passport');


router.post('/', async (req,res) =>{
    const {user, password} = req.body;
    const empleado = await pool.query('SELECT * FROM empleados where username = ? and password = ?',[user,password]);
    passport.authenticate('local.login',{
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    });
    if(Object.keys(empleado).length === 0){
        res.json('El empleado no EXISTE!');
    }else{
        res.send(empleado);
    }
    
});

router.get('/', async (req,res) =>{
    const pacientes = await pool.query('SELECT * FROM empleados');
    res.json(pacientes);
});

module.exports = router; 