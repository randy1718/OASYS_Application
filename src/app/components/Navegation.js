import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch, Link,NavLink} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import {withRouter} from 'react-router';

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
            <Link to="/" className="navbar-brand" style={{color:'seagreen'}}>
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
                  <Link className="nav-link" to="/">
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
                  <Nav.Link className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Registro
                  </Nav.Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Nav.Item><Nav.Link className="dropdown-item" href="/citas">Citas</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link className="dropdown-item" href="/createPaciente">Pacientes</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link className="dropdown-item" href="/createEmpleado">Empleados</Nav.Link></Nav.Item>
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
