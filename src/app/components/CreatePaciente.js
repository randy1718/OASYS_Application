import React, { Component } from "react";
import Navegation from "./Navegation";

export default class CreatePaciente extends Component {

  constructor(){
    super();
    this.state = {
      fullname: '',
      idTipoDNI:'',
      dni: '',
      idGenero: '',
      idMedioContacto: '',
      email:'',
      cellphone:'',
      birthDate: ''
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  } 

  addTask(e) {
    console.log(this.state);
    fetch('/pacientes',{
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data =>{
        console.log(data),
        alert('paciente creado exitosamente!')
        this.setState({
          fullname: '',
          idTipoDNI:'',
          dni: '',
          idGenero: '',
          idMedioContacto: '',
          email:'',
          cellphone:'',
          birthDate: ''
        });
      })
      .catch(err => console.error(err));

    e.preventDefault();
  }

  componentDidMount(){
    console.log("Bienvenido no regreses! :/");
    this.fetchPacientes();
  }

  fetchPacientes(){
    fetch('/pacientes')
    .then(res => res.json())
    .then(data => {
      console.log(data)
    });
  }

  handleChange(e){
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
    console.log(e.target.name);
  }


  render() {
    return (
      <div>
        <Navegation/>
        <div className="jumbotron vertical-center">
          <div className="container-md align-items-center">
            <div className="row">
              <div className="col-md-4 mx-auto">
                <div className="card">
                  <div className="card-body">
                    <h1 className="titulo">Nuevo paciente</h1>
                    <form onSubmit={this.addTask}>
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
                          name="idMedioContacto"
                          value={this.state.idMedioContacto}
                          onChange={this.handleChange}
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
                          <button className="btn btn-success">Enviar</button>
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
    );
  }
}
