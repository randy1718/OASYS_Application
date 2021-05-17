import React, { Component } from "react";
import Navegation from "./Navegation";

export default class CreateEmpleado extends Component {
  constructor() {
    super();
    this.state = {
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
    };
    this.addEmpleado = this.addEmpleado.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addEmpleado(e) {
    console.log(this.state);
    fetch("/empleados", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data), alert("Empleado creado exitosamente!");
        this.setState({
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
      })
      .catch((err) => console.error(err));

    e.preventDefault();
  }

  componentDidMount() {
    console.log("Bienvenido no regreses! :/");
    this.fetchPacientes();
  }

  fetchPacientes() {
    fetch("/empleados")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    console.log(e.target.name);
  }

  render() {
    return (
      <div>
        <Navegation />
        <div className="boxEmpleado">
          <div className="jumbotron vertical-center ">
            <div className="container-md align-items-center">
              <div className="row">
                <div className="col-md-4 mx-auto">
                  <div className="card">
                    <div className="card-body">
                      <h1 className="titulo">Nuevo empleado</h1>
                      <form onSubmit={this.addEmpleado}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="fullname"
                            value={this.state.fullname}
                            onChange={this.handleChange}
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
                            value={this.state.user}
                            onChange={this.handleChange}
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
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="Contraseña"
                            autoFocus
                            required
                          />
                        </div>
                        <div className="form-group">
                          <select
                            className="form-select"
                            name="idTipoDNI"
                            value={this.state.idTipoDNI}
                            onChange={this.handleChange}
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
                            value={this.state.dni}
                            onChange={this.handleChange}
                            placeholder="Documento de identidad"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <select
                            className="form-select"
                            name="idGenero"
                            value={this.state.idGenero}
                            onChange={this.handleChange}
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
                            value={this.state.idTipoEmpleado}
                            onChange={this.handleChange}
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
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="Email"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="number"
                            className="form-control"
                            name="cellphone"
                            value={this.state.cellphone}
                            onChange={this.handleChange}
                            placeholder="Celular"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="date"
                            className="form-control"
                            name="birthDate"
                            value={this.state.birthDate}
                            onChange={this.handleChange}
                            placeholder="Fecha de nacimiento"
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
}
