CREATE DATABASE ODONTOLOGIA;

USE ODONTOLOGIA;

CREATE TABLE tipoDni(
    idTipoDni INT(5) NOT NULL,
    PRIMARY KEY(idTipoDni),
    tipoDNI varchar(30) NOT NULL
);

CREATE TABLE genero(
    idgenero INT(5) NOT NULL,
    PRIMARY KEY(idgenero),
    genero varchar(30) NOT NULL
);

CREATE TABLE tipoEmpleado(
    idTipoEmpleado INT(5) NOT NULL,
    PRIMARY KEY(idTipoEmpleado),
    tipoEmpleado varchar(30) NOT NULL
);

CREATE TABLE medioContactoPreferencial(
    idmedioContacto INT(5) NOT NULL,
    PRIMARY KEY(idmedioContacto),
    tipoMedio varchar(30) NOT NULL
);

CREATE TABLE tipoCita(
    idTipoCita INT(5) NOT NULL,
    PRIMARY KEY(idTipoCita),
    tipoCita varchar(30) NOT NULL
);

CREATE TABLE estado(
    idEstado INT(5) NOT NULL,
    PRIMARY KEY(idEstado),
    estado varchar(30) NOT NULL
);

CREATE TABLE estadoConfirmacion(
    idConfirmacion INT(5) NOT NULL,
    PRIMARY KEY(idConfirmacion),
    estadoConfirmacion varchar(30) NOT NULL
);

CREATE TABLE empleados(
    idEmpleado INT(15) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (idEmpleado)
    dni INT(20) NOT NULL,
    username varchar(16) NOT NULL,
    password varchar(30) NOT NULL,
    fullname varchar(30) NOT NULL,
    email varchar(30) NOT NULL,
    cellphone varchar(15) NOT NULL,
    birthDate date NOT NULL,
    idTipoEmpleado INT(5) NOT NULL,
    idGenero INT(5) NOT NULL,
    idtipoDNI INT(5) NOT NULL
);

ALTER TABLE empleados
    MODIFY idEmpleado INT(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

CREATE TABLE pacientes(
    idPaciente INT(15) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(idPaciente),
    dni INT(20) NOT NULL,
    idtipoDNI INT(5) NOT NULL,
    idGenero INT(5) NOT NULL,
    fullname varchar(30) NOT NULL,
    email varchar(30) NOT NULL,
    cellphone varchar(15) NOT NULL,
    birthDate date NOT NULL,
    idmedioContacto INT(5) NOT NULL
);

CREATE TABLE citas(
    idCita INT(15) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(idCita),
    idDoctor INT(5) NOT NULL,
    FOREIGN KEY(idDoctor) REFERENCES empleados(idEmpleado),
    idPaciente INT(5) NOT NULL,
    FOREIGN KEY(idPaciente) REFERENCES pacientes(idPaciente),
    idTipoCita INT(5) NOT NULL,
    FOREIGN KEY(idTipoCita) REFERENCES tipoCita(idTipoCita),
    idConfirmacion INT(5) NOT NULL,
    FOREIGN KEY(idConfirmacion) REFERENCES estadoConfirmacion(idConfirmacion),
    idEstado INT(10) NOT NULL,
    FOREIGN KEY(idEstado) REFERENCES estado(idEstado),
    fecha date NOT NULL,
    hora time NOT NULL,
    duracion_minutos INT(10) NOT NULL
);

ALTER TABLE citas
    MODIFY idCita INT(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

ALTER TABLE pacientes
    ADD FOREIGN KEY(idtipoDNI) REFERENCES tipoDni(idTipoDni);

ALTER TABLE pacientes
    ADD FOREIGN KEY(idGenero) REFERENCES genero(idgenero);

ALTER TABLE pacientes
    ADD FOREIGN KEY(idmedioContacto) REFERENCES medioContactoPreferencial(idmedioContacto);

ALTER TABLE empleados
    ADD FOREIGN KEY(idtipoDNI) REFERENCES tipoDni(idTipoDni);

ALTER TABLE empleados
    ADD FOREIGN KEY(idGenero) REFERENCES genero(idgenero);

ALTER TABLE empleados
    ADD FOREIGN KEY(idTipoEmpleado) REFERENCES tipoEmpleado(idTipoEmpleado);

