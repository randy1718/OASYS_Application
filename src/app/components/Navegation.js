import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch, Link,NavLink} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import {withRouter} from 'react-router';
import auth from "./auth";

export default withRouter(class Navegation extends Component {

  getNavLinkClass = (path) =>{
    return this.props.history.location.pathname === path ? 'active':'';
  }

  render() {
    return (
      <div>
      <div>
        <Nav defaultActiveKey={{}} className="navbar navbar-expand-lg navbar-light navbar-custom">
          <div className="container-fluid">
            <Link to="/home" className="navbar-brand" style={{color:'seagreen'}}>
              OASYS
            </Link>
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
                <Nav.Item className='nav-item'>
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                  <Link className="nav-link" to="/citas">
                    Agenda
                  </Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                  <NavLink className="nav-link" to="/createPaciente">
                    Cuenta
                  </NavLink>
                </Nav.Item>
                <Nav.Item className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Registro
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Nav.Item><NavLink className="dropdown-item" to="/citas">Citas</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="dropdown-item" to="/createPaciente">Pacientes</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="dropdown-item" to="/createEmpleado">Empleados</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="dropdown-item" to="/login">Log out {}</NavLink></Nav.Item>
                  </ul>
                </Nav.Item>
              </ul>
            </div>
          </div>
        </Nav>
      </div>
      </div>
    );
  }
})
