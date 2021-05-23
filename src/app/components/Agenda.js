import React, { Component, useState, useEffect } from "react";
import Navegation from "./Navegation";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import Moment from "moment";
import Date from "date";
import Button from "react-bootstrap/Button";

export default function Agenda() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showMessage, setShowMessage] = useState(false);
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = () => setShowMessage(true);
  const months = [
    "Nada",
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const [cita, setCita] = useState({
    idDoctor: "",
    idPaciente: "",
    idTipoCita: "",
    fechaCita: "",
    hora: "",
    duracion_minutos: "",
    _id: "",
  });

  const [doctores, setdoctores] = useState({
    doctores: [],
  });

  const [citas, setCitas] = useState({
    citas: [],
  });

  const [pacientes, setpacientes] = useState({
    pacientes: [],
  });

  const [boton, setBoton] = useState("Crear");
  const [titleCita, setTitleCita] = useState("Nueva");

  const addCita = (e) => {
    console.log(cita);
    if (cita._id) {
      fetch(`/agenda/update/${cita._id}`, {
        method: "PUT",
        body: JSON.stringify(cita),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
      .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCita({
            idDoctor: "",
            idPaciente: "",
            idTipoCita: "",
            fechaCita: "",
            hora: "",
            duracion_minutos: "",
            _id:""
          });
          fetchCitas();
          setTitleCita("Crear");
          setBoton("Crear");
        })
    } else {
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
          setCita({
            idDoctor: "",
            idPaciente: "",
            idTipoCita: "",
            fechaCita: "",
            hora: "",
            duracion_minutos: "",
          });

          handleShowMessage();
          fetchCitas();
          setBoton("Crear");
        })
        .catch((err) => console.error(err));
    }
    e.preventDefault();
  };

  const CitaCreada = () => (
    <Modal
      show={showMessage}
      size="sm"
      aria-labelledby="example-custom-modal-styling-title"
      centered
      onHide={handleCloseMessage}
      animation={true}
    >
      <Modal.Body>Cita creada exitosamente!</Modal.Body>
    </Modal>
  );

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
        setCitas({
          citas: data,
        });
      });
  };

  const deleteCita = (id) => {
    console.log(id);
    fetch(`/agenda/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchCitas();
      });
  };

  const modifyCita = (id) => {
    console.log(id);
    setBoton("Modificar");
    setTitleCita("Modificar");
    fetch(`/agenda/update/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setCita({
          idDoctor: data[0].idDoctor,
          idPaciente: data[0].idPaciente,
          idTipoCita: data[0].idTipoCita,
          fechaCita: Moment(data[0].fechaCita).format("YYYY-MM-DD"),
          hora: data[0].hora,
          duracion_minutos: data[0].duracion_minutos,
          _id: data[0].idCita,
        });
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
    setCita((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(cita);
    console.log(e.target.value);
    console.log(e.target.name);
  };

  const Mensaje = () => (
    <Modal
      show={show}
      size="md"
      aria-labelledby="example-custom-modal-styling-title"
      centered
      onHide={handleClose}
      animation={true}
    >
      <ModalHeader closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 className="titulo">Nueva cita</h1>
        </Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
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
                      <option
                        key={paciente.idPaciente}
                        value={paciente.idPaciente}
                      >
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
      </Modal.Body>
    </Modal>
  );

  return (
    <div>
      <Navegation />
      <Mensaje />
      <CitaCreada />
      <div className="boxCitas">
        <div className="jumbotron vertical-center ">
          <div className="container-md align-items-center">
            <div className="row">
              <div className="col-md-4 mx-auto">
                <div className="card cardCita">
                  <div className="card-body">
                    <h1 className="titulo">{titleCita} cita</h1>
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
                            <option
                              key={doctor.idEmpleado}
                              value={doctor.idEmpleado}
                            >
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
                            <option
                              key={paciente.idPaciente}
                              value={paciente.idPaciente}
                            >
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
                          <input
                            type="submit"
                            className="btn btn-success"
                            value={boton}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-4 cCitas">
                <div></div>
                {citas.citas.map((cita) => {
                  return (
                    <div className="" key={cita.idCita}>
                      <div className="container">
                        <div className="card cardCitas">
                          <div className="titleCard" key={cita.idCita}>
                            Cita {Moment(cita.fechaCita).format("DD")} de{" "}
                            {
                              months[
                                parseInt(Moment(cita.fechaCita).format("MM"))
                              ]
                            }{" "}
                            del {Moment(cita.fechaCita).format("YYYY")}
                          </div>
                          <div>
                            Hora:{" "}
                            {Moment(cita.hora, "HH:mm:ss").format("hh:mm A")}
                          </div>
                          <div>Paciente {cita.fullname}</div>
                          <div> {cita.tipoCita}</div>
                          <div className="divBoton1">
                            <Button
                              onClick={() => modifyCita(cita.idCita)}
                              className="botonverde"
                              variant="success"
                            >
                              Terminar
                            </Button>
                          </div>
                          <div className="divBoton2">
                            <Button
                              onClick={() => deleteCita(cita.idCita)}
                              className="botonrojo"
                              variant="danger"
                            >
                              Borrar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
