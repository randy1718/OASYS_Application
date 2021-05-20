import React, { Component, useState, useEffect } from "react";
import Navegation from "./Navegation";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function Agenda() {
  const [cita, setCita] = useState({
    idDoctor: "",
    idPaciente: "",
    idTipoCita: "",
    fechaCita: "",
    hora: "",
    duracion_minutos: "",
  });

  const [doctores, setdoctores] = useState({
    doctores: [],
  });

  const [pacientes, setpacientes] = useState({
    pacientes: [],
  });

  const addCita = (e) => {
    console.log(cita);
    fetch("/agenda", {
      method: "POST",
      body: JSON.stringify(cita),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data), alert("Cita creada exitosamente!");
        setCita({
          idDoctor: "",
          idPaciente: "",
          idTipoCita: "",
          fechaCita: "",
          hora: "",
          duracion_minutos: "",
        });
      })
      .catch((err) => console.error(err));

    e.preventDefault();
  };

  useEffect(() => {
    console.log("Bienvenido no regreses! :/");
    fetchCitas();
    fetchDoctores();
    fetchPacientes();
  }, []);

  const fetchCitas = () => {
    fetch("/agenda")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const fetchDoctores = () => {
    fetch("/getdoctores")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setdoctores({
          doctores: data,
        });
      });
  };

  const fetchPacientes = () => {
    fetch("/getpacientes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setpacientes({
          pacientes: data,
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCita(prevState => ({
      ...prevState,
      [name]: value,
    }));
    console.log(cita);
    console.log(e.target.value);
    console.log(e.target.name);
  };

  return (
    <div>
      <Navegation />
      <div className="boxCitas">
        <div className="jumbotron vertical-center ">
          <div className="container-md align-items-center">
            <div className="row">
              <div className="col-md-4 mx-auto">
                <div className="card">
                  <div className="card-body">
                    <h1 className="titulo">Nueva cita</h1>
                    <form onSubmit={addCita}>
                      <div className="form-group">
                        <select
                          className="form-select"
                          name="idDoctor"
                          value={cita.idDoctor}
                          onChange={handleChange}
                          placeholder="Doctor"
                          required
                        >
                          <option value="0">Doctor</option>
                          {doctores.doctores.map((doctor) => (
                            <option key={doctor.idEmpleado} value={doctor.idEmpleado}>
                              {doctor.fullname}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <select
                          className="form-select"
                          name="idPaciente"
                          value={cita.idPaciente}
                          onChange={handleChange}
                          placeholder="Paciente"
                          required
                        >
                          <option value="0">Paciente</option>
                          {pacientes.pacientes.map((paciente) => (
                            <option key={paciente.idPaciente} value={paciente.idEmpleado}>
                              {paciente.fullname}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <select
                          className="form-select"
                          name="idTipoCita"
                          value={cita.idTipoCita}
                          onChange={handleChange}
                          placeholder="Tipo cita"
                          required
                        >
                          <option value="0">Tipo de cita</option>
                          <option value="1">Revision Ortodoncia</option>
                          <option value="2">Realizacion conducto</option>
                          <option value="3">Limpieza</option>
                          <option value="4">Protesis</option>
                          <option value="5">Empastes</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control"
                          name="fechaCita"
                          value={cita.fechaCita}
                          onChange={handleChange}
                          placeholder="Fecha de nacimiento"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="time"
                          className="form-control"
                          name="hora"
                          value={cita.hora}
                          onChange={handleChange}
                          placeholder="Hora de la cita"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          name="duracion_minutos"
                          value={cita.duracion_minutos}
                          onChange={handleChange}
                          placeholder="Duracion (minutos)"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <div className="d-grid gap-2">
                          <button className="btn btn-success">Crear</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
