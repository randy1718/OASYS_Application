const express = require("express");
const router = express.Router();

const pool = require("../database");
const passport = require("passport");

/*router.post('/', async (req,res) =>{

    passport.authenticate('local.signup',{
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    });*/

router.post("/",passport.authenticate("local.signup", {failureRedirect: "/"}, 
    function (req, res) {
        return res.redirect('/home');
    }
))

  /*const {fullname,username, password,idTipoDNI, dni,idGenero,idTipoEmpleado, email, cellphone, birthDate} = req.body;
    const newEmpleado = {
        dni,
        username,
        password,
        fullname,
        email,
        cellphone,
        birthDate,
        idTipoEmpleado,
        idGenero,
        idTipoDNI,
    };
    await pool.query("INSERT INTO empleados set ?",[newEmpleado]);
    console.log(newEmpleado);
    console.log(req.body);
    req.flash('success','Empleado creado correctamente!');
    res.json('received');
});*/

router.get("/", async (req, res) => {
  const empleados = await pool.query("SELECT * FROM empleados");
  res.json(empleados);
});

module.exports = router;
