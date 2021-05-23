import React, { Component } from "react";
import Navegation from "./Navegation";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "react-bootstrap/Modal";
import { withRouter } from "react-router";

export default function Citas() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Mensaje = () => (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="example-custom-modal-styling-title"
      centered
      onHide={handleClose}
    >
      <ModalHeader closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </ModalHeader>
      <Modal.Body>
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
                                value={paciente.idEmpleado}
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
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
  return (
    <div>
      <Navegation />
      <Button variant="primary" onClick={handleShow}>
        Ventana emergente
      </Button>
    </div>
  );
}
