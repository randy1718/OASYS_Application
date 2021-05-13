import React, { Component } from "react";
import {toast} from 'react-toastify';

toast.configure()

class App extends Component {

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
      })
      .catch(err => console.error(err));

    e.preventDefault();
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              OASYS
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Agenda
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Cuenta
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="/" tabIndex="-1" aria-disabled="true">
                    Disabled
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div>

          <br>
          </br>
        </div>

        <div className="jumbotron vertical-center">
        <div className="container-md align-items-center">
          <div className="row">
            <div className="col-md-4 mx-auto">
              <div className="card">
                <div className="card-body">
                  <h1 className="titulo">Nuevo paciente</h1>
                  <form onSubmit={this.addTask}>
                    <div className="form-group">
                      <input type="text" className="form-control" name="fullname" onChange={this.handleChange} placeholder="Nombre completo" autoFocus required />
                    </div>
                    <div className="form-group">
                      <select className="form-select" name="idTipoDNI" onChange={this.handleChange} placeholder="tipo de documento"  required>
                        <option value="0">Tipo de documento</option>
                        <option value="1">Cedula de ciudadania</option>
                        <option value="2">Pasaporte</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <input type="number" className="form-control" name="dni" onChange={this.handleChange} placeholder="Documento de identidad" required/>
                    </div>
                    <div className="form-group">
                      <select className="form-select" name="idGenero" onChange={this.handleChange} placeholder="Genero"  required>
                        <option value="0">Género</option>
                        <option value="1">Masculino</option>
                        <option value="2">Femenino</option>
                        <option value="3">Prefiere no responder</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <select className="form-select" name="idMedioContacto" onChange={this.handleChange} placeholder="Medio de contacto" required>
                        <option value="0">Medio de contacto preferencial</option>
                        <option value="1">Whatsapp</option>
                        <option value="2">Email</option>
                        <option value="3">Llamada</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control" name="email" onChange={this.handleChange} placeholder="Email"  required/>
                    </div>
                    <div className="form-group">
                      <input type="number" className="form-control" name="cellphone" onChange={this.handleChange} placeholder="Celular" required/>
                    </div>
                    <div className="form-group">
                      <input type="date" className="form-control" name="birthDate" onChange={this.handleChange} placeholder="Fecha de nacimiento" required/>
                    </div>
                    <div className="form-group">
                      <div className="d-grid gap-2">
                        <button className="btn btn-success">
                          Enviar
                        </button>
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

export default App;
