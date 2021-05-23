const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

/*passport.use('local.login',new LocalStrategy({
    usernameField:'user',
    passwordField:'password',
    passReqToCallback: true
}, async(req,username,password,done) => {
    console.log(req.body);
}));*/

passport.use('local.signup',new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback: true

}, async(req,username,password, done) => {

    console.log(req.body);
    const {fullname,idTipoDNI, dni,idGenero,idTipoEmpleado, email, cellphone, birthDate} = req.body;
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

    newEmpleado.password = await helpers.encryptPassword(password);
    const result = await pool.query("INSERT INTO empleados set ?",[newEmpleado]);
    newEmpleado.id = result.insertId;
    console.log(result);
    return done(null, newEmpleado);

}));

passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null,user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM empleados where idEmpleado = ?',[id]);
    console.log(rows);
    done(null,rows[0]);
});
