CREATE DATABASE ODONTOLOGIA;

USE ODONTOLOGIA;

CREATE TABLE empleados(
    idEmpleado INT(15) NOT NULL,
    dni INT(20) NOT NULL,
    username varchar(16) NOT NULL,
    password varchar(60) NOT NULL,
    fullname varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    cellphone int(10) NOT NULL,
    birthDate date NOT NULL
);

ALTER TABLE empleados
    ADD PRIMARY KEY (idEmpleado);

ALTER TABLE empleados
    MODIFY idEmpleado INT(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE empleados;

CREATE TABLE pacientes(
    idPaciente INT(15) NOT NULL,
    dni INT(20) NOT NULL,
    idtipoDNI INT(15) NOT NULL,
    idGenero INT(20) NOT NULL,
    fullname varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    cellphone int(10) NOT NULL,
    birthDate date NOT NULL
);

CREATE TABLE tipoDni(
    idTipoDni INT(15) NOT NULL,
    tipoDNI varchar(30) NOT NULL
);

CREATE TABLE genero(
    idgenero INT(15) NOT NULL,
    genero varchar(30) NOT NULL
);

CREATE TABLE tipoEmpleado(
    idTipoEmpleado INT(15) NOT NULL,
    tipoEmpleado varchar(30) NOT NULL
);

CREATE TABLE medioContactoPreferencial(
    idmedioContacto INT(15) NOT NULL,
    tipoMedio varchar(30) NOT NULL
);

CREATE TABLE citas(
    idCita INT(15) NOT NULL,
    PRIMARY KEY(idCita),
    idDoctor INT(15) NOT NULL,
    FOREIGN KEY(idDoctor) REFERENCES empleados(idEmpleado),
    idPaciente INT(15) NOT NULL,
    FOREIGN KEY(idPaciente) REFERENCES pacientes(idPaciente),
    idTipoCita INT(15) NOT NULL,
    idConfirmacion INT(10) NOT NULL,
    idEstado INT(10) NOT NULL,
    fecha date NOT NULL,
    hora time NOT NULL,
    duracion_minutos INT(10) NOT NULL
);

ALTER TABLE citas
     MODIFY idCita INT(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;


CREATE TABLE tipoCita(
    idTipoCita INT(15) NOT NULL,
    PRIMARY KEY(idTipoCita),
    tipoCita varchar(30) NOT NULL
);

CREATE TABLE estado(
    idEstado INT(15) NOT NULL,
    PRIMARY KEY(idEstado),
    estado varchar(30) NOT NULL
);

CREATE TABLE estadoConfirmacion(
    idConfirmacion INT(15) NOT NULL,
    PRIMARY KEY(idConfirmacion),
    estadoConfirmacion varchar(30) NOT NULL
);
