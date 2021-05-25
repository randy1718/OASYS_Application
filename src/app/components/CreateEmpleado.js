import React, { Component, useState, useEffect } from "react";
import Navegation from "./Navegation";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import Moment from "moment";

export default function CreateEmpleado() {
  const [showMessage, setShowMessage] = useState(false);
  const [mensaje, setMensaje] = useState("¡Empleado creado correctamente!");
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = () => setShowMessage(true);
  const [boton, setBoton] = useState("Crear");
  const [titleEmpleado, setTitleEmpleado] = useState("Nuevo");

  const [empleado, setEmpleado] = useState({
    fullname: "",
    username: "",
    password: "",
    idTipoDNI: "",
    dni: "",
    idGenero: "",
    idTipoEmpleado: "",
    email: "",
    cellphone: "",
    birthDate: "",
    _id: "",
  });

  const [empleados, setEmpleados] = useState({
    empleados: [],
  });

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

  const addEmpleado = (e) => {
    console.log(empleado);
    if (empleado._id) {
      fetch(`/empleados/update/${empleado._id}`, {
        method: "PUT",
        body: JSON.stringify(empleado),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setEmpleado({
            fullname: "",
            username: "",
            password: "",
            idTipoDNI: "",
            dni: "",
            idGenero: "",
            idTipoEmpleado: "",
            email: "",
            cellphone: "",
            birthDate: "",
          });
          fetchEmpleados();
          setMensaje(data);
          handleShowMessage();
          setTitleEmpleado("Crear");
          setBoton("Crear");
          
        })
        .catch((err) => console.error(err));
    } else {
      fetch("/empleados", {
        method: "POST",
        body: JSON.stringify(empleado),
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
          setEmpleado({
            fullname: "",
            username: "",
            password: "",
            idTipoDNI: "",
            dni: "",
            idGenero: "",
            idTipoEmpleado: "",
            email: "",
            cellphone: "",
            birthDate: "",
          });
          fetchEmpleados();
        })
        .catch((err) => console.error(err));
    }
    e.preventDefault();
  };

  useEffect(() => {
    console.log("Bienvenido no regreses! :/");
    fetchEmpleados();
  }, []);

  const fetchEmpleados = () => {
    fetch("/empleados")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmpleados({
          empleados: data,
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(e.target.name);
  };

  const modifyEmpleado = (id) => {
    console.log(id);
    setBoton("Modificar");
    setTitleEmpleado("Modificar");
    fetch(`/empleados/update/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setEmpleado({
          fullname: data[0].fullname,
          username: data[0].username,
          password: data[0].password,
          idTipoDNI: data[0].idTipoDNI,
          dni: data[0].dni,
          idGenero: data[0].idGenero,
          idTipoEmpleado: data[0].idTipoEmpleado,
          email: data[0].email,
          cellphone: data[0].cellphone,
          birthDate: Moment(data[0].birthDate).format("YYYY-MM-DD"),
          _id: data[0].idEmpleado,
        });
      });
  };

  const deleteEmpleado = (id) => {
    console.log(id);
    fetch(`/empleados/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMensaje(data);
        handleShowMessage();
        setEmpleado({
          fullname: "",
          username: "",
          password: "",
          idTipoDNI: "",
          dni: "",
          idGenero: "",
          idTipoEmpleado: "",
          email: "",
          cellphone: "",
          birthDate: "",
        });
        fetchEmpleados();
      });
  };

  return (
    <div>
      <Navegation />
      <Mensajepopup />
      <div className="boxEmpleado">
        <div className="jumbotron vertical-center ">
          <div className="container-md align-items-center">
            <div className="row">
              <div className="col-md-4 mx-auto">
                <div className="card">
                  <div className="card-body">
                    <h1 className="titulo">{titleEmpleado} empleado</h1>
                    <form onSubmit={addEmpleado}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="fullname"
                          value={empleado.fullname}
                          onChange={handleChange}
                          placeholder="Nombre completo"
                          autoFocus
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={empleado.username}
                          onChange={handleChange}
                          placeholder="Usuario"
                          autoFocus
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={empleado.password}
                          onChange={handleChange}
                          placeholder="Contraseña"
                          autoFocus
                          required
                        />
                      </div>
                      <div className="form-group">
                        <select
                          className="form-select"
                          name="idTipoDNI"
                          value={empleado.idTipoDNI}
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
                          value={empleado.dni}
                          onChange={handleChange}
                          placeholder="Documento de identidad"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <select
                          className="form-select"
                          name="idGenero"
                          value={empleado.idGenero}
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
                          name="idTipoEmpleado"
                          value={empleado.idTipoEmpleado}
                          onChange={handleChange}
                          placeholder="Medio de contacto"
                          required
                        >
                          <option value="0">Tipo de empleado</option>
                          <option value="2">Doctor/a</option>
                          <option value="3">Recepción</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={empleado.email}
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
                          value={empleado.cellphone}
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
                          value={empleado.birthDate}
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
              <div className="col-md-6 mx-auto ccEmpleados">
                {empleados.empleados.map((empleado) => {
                  return (
                    <div className="container" key={empleado.idEmpleado}>
                      <div className="container">
                        <div className="card cEmpleado">
                          <div className="titleCard" key={empleado.idEmpleado}>
                            Empleado {empleado.fullname}
                          </div>
                          <div>{empleado.tipoEmpleado}</div>
                          <div>Celular {empleado.cellphone}</div>
                          <div>Email {empleado.email}</div>
                          <div className="BotonesCRUD">
                            <div className="divBoton1Paciente">
                              <Button
                                onClick={() =>
                                  modifyEmpleado(empleado.idEmpleado)
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
                                  deleteEmpleado(empleado.idEmpleado)
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
