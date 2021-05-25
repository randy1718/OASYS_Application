import React, { Component, useState, useEffect } from "react";
import Navegation from "./Navegation";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import Moment from "moment";

export default function CreatePaciente() {
  const [showMessage, setShowMessage] = useState(false);
  const [mensaje, setMensaje] = useState("¡Paciente creada correctamente!");
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = () => setShowMessage(true);

  const [paciente, setPaciente] = useState({
    fullnamePaciente: "",
    idTipoDNI: "",
    dni: "",
    idGenero: "",
    idMedioContacto: "",
    email: "",
    cellphone: "",
    birthDate: "",
    _id: "",
  });

  const [pacientes, setPacientes] = useState({
    pacientes: [],
  });

  const [boton, setBoton] = useState("Crear");
  const [titlePaciente, setTitlePaciente] = useState("Nueva");

  const addTask = (e) => {
    console.log(paciente);
    if (paciente._id) {
      fetch(`/pacientes/update/${paciente._id}`, {
        method: "PUT",
        body: JSON.stringify(paciente),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPaciente({
            fullnamePaciente: "",
            idTipoDNI: "",
            dni: "",
            idGenero: "",
            idMedioContacto: "",
            email: "",
            cellphone: "",
            birthDate: "",
            _id: "",
          });
          setMensaje(data);
          handleShowMessage();
          fetchPacientes();
          setTitlePaciente("Crear");
          setBoton("Crear");
        });
    } else {
      fetch("/pacientes", {
        method: "POST",
        body: JSON.stringify(paciente),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMensaje(data);
          handleShowMessage();
          setPaciente({
            fullnamePaciente: "",
            idTipoDNI: "",
            dni: "",
            idGenero: "",
            idMedioContacto: "",
            email: "",
            cellphone: "",
            birthDate: "",
            _id: "",
          });
          fetchPacientes();
        })
        .catch((err) => console.error(err));
    }
    e.preventDefault();
  };

  useEffect(() => {
    console.log("Bienvenido no regreses! :/");
    fetchPacientes();
  }, []);

  const fetchPacientes = () => {
    fetch("/pacientes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPacientes({
          pacientes: data,
        });
      });
  };

  const Mensajepopup = () => (
    <Modal
      show={showMessage}
      size="sm"
      aria-labelledby="example-custom-modal-styling-title"
      centered
      onHide={handleCloseMessage}
      animation={true}
    >
      <Modal.Body>
        <div className="container align-items-center">{mensaje}</div>
      </Modal.Body>
    </Modal>
  );

  const deletePaciente = (id) => {
    console.log(id);
    fetch(`/pacientes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMensaje(data);
        handleShowMessage();
        setPaciente({
          fullnamePaciente: "",
          idTipoDNI: "",
          dni: "",
          idGenero: "",
          idMedioContacto: "",
          email: "",
          cellphone: "",
          birthDate: "",
        });
        fetchPacientes();
      });
  };

  const modifyPaciente = (id) => {
    console.log(id);
    setBoton("Modificar");
    setTitlePaciente("Modificar");
    fetch(`/pacientes/update/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setPaciente({
          fullnamePaciente: data[0].fullnamePaciente,
          idTipoDNI: data[0].idtipoDNI,
          dni: data[0].dni,
          idGenero: data[0].idGenero,
          idMedioContacto: data[0].idMedioContacto,
          email: data[0].email,
          cellphone: data[0].cellphone,
          birthDate: Moment(data[0].birthDate).format("YYYY-MM-DD"),
          _id: data[0].idPaciente,
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(e.target.name);
  };

  return (
    <div>
      <Navegation />
      <Mensajepopup />
      <div className="boxPacientes">
        <div className="jumbotron vertical-center ">
          <div className="container-md align-items-center contPacientes">
            <div className="row">
              <div className="col-md-4 mx-auto">
                <div className="card cardPaciente">
                  <div className="card-body">
                    <h1 className="titulo">{titlePaciente} paciente</h1>
                    <form onSubmit={addTask}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="fullnamePaciente"
                          value={paciente.fullnamePaciente}
                          onChange={handleChange}
                          placeholder="Nombre completo"
                          autoFocus
                          required
                        />
                      </div>
                      <div className="form-group">
                        <select
                          className="form-select"
                          name="idTipoDNI"
                          value={paciente.idTipoDNI}
                          onChange={handleChange}
                          placeholder="tipo de documento"
                          required
                        >
                          <option value="0">Tipo de documento</option>
                          <option value="1">Cedula de ciudadania</option>
                          <option value="2">Pasaporte</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          name="dni"
                          value={paciente.dni}
                          onChange={handleChange}
                          placeholder="Documento de identidad"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <select
                          className="form-select"
                          name="idGenero"
                          value={paciente.idGenero}
                          onChange={handleChange}
                          placeholder="Genero"
                          required
                        >
                          <option value="0">Género</option>
                          <option value="1">Masculino</option>
                          <option value="2">Femenino</option>
                          <option value="3">Prefiere no responder</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <select
                          className="form-select"
                          name="idMedioContacto"
                          value={paciente.idMedioContacto}
                          onChange={handleChange}
                          placeholder="Medio de contacto"
                          required
                        >
                          <option value="0">
                            Medio de contacto preferencial
                          </option>
                          <option value="1">Whatsapp</option>
                          <option value="2">Email</option>
                          <option value="3">Llamada</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={paciente.email}
                          onChange={handleChange}
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          name="cellphone"
                          value={paciente.cellphone}
                          onChange={handleChange}
                          placeholder="Celular"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control"
                          name="birthDate"
                          value={paciente.birthDate}
                          onChange={handleChange}
                          placeholder="Fecha de nacimiento"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <div className="d-grid gap-2">
                          <button className="btn btn-success">{boton}</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-8 mx-auto ccPacientes">
                {pacientes.pacientes.map((paciente) => {
                  return (
                    <div className="container" key={paciente.idPaciente}>
                      <div className="container">
                        <div className="card cPacientes">
                          <div className="titleCard" key={paciente.idPaciente}>
                            Paciente {paciente.fullnamePaciente}
                          </div>
                          <div>Medio de contacto {paciente.tipoMedio}</div>
                          <div>Celular {paciente.cellphone}</div>
                          <div>Email {paciente.email}</div>
                          <div className="BotonesCRUD">
                            <div className="divBoton1Paciente">
                              <Button
                                onClick={() =>
                                  modifyPaciente(paciente.idPaciente)
                                }
                                className="botonverdePaciente"
                                variant="success"
                              >
                                Editar
                              </Button>
                            </div>
                            <div className="divBoton2Paciente">
                              <Button
                                onClick={() =>
                                  deletePaciente(paciente.idPaciente)
                                }
                                className="botonrojoPaciente"
                                variant="danger"
                              >
                                Borrar
                              </Button>
                            </div>
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
