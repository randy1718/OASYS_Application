const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const {database} =require('./keys');

//inicializacion
const app = express();
require('./lib/passport');

//settings
app.set('port',process.env.PORT || 4000);
/*app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine','.hbs');*/

//Middlewares

app.use(session({
    secret:'sesion OASYS',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Global variables
app.use((req,res,next) =>{
    res.locals.success = req.flash('success') 
    next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/pacientes',require('./routes/patients'));
app.use('/ingreso',require('./routes/ingreso'));
app.use('/empleados',require('./routes/employees'));
app.use('/agenda',require('./routes/citas'));
app.use('/getdoctores',require('./routes/getDoctores'));
app.use('/getpacientes',require('./routes/getPacientes'));

//Public 
app.use(express.static(path.join(__dirname,'public')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
} );

app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname,'/public/index.html'), function(err){
        if(err){
            res.status(500).send(err)
        }
    })
});