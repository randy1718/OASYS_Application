import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router";
import auth from "./auth";

export default function PaginaInicio() {
  return (
    <div>
      <div>
        <Nav
          defaultActiveKey={{}}
          className="navbar navbar-expand-lg navbar-light navbar-custom"
        >
          <div className="container-fluid">
            <Link to="/" className="navbar-brand" style={{ color: "seagreen" }}>
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

            <div className="" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <Nav.Item className="nav-item">
                  <Link className="nav-link" to="/login">
                    Ingresar
                  </Link>
                </Nav.Item>
              </ul>
            </div>
          </div>
        </Nav>
      </div>
      <div className="jumbotron vertical-center">
        <div className="container">
          <div clasName="card cardMensaje">
            <div className="card-body">
              <div className="ContenidoMensaje card">
                <div className="mensajeInicio">OASYS</div>
                <br />
                <div className="mensajeInicio2">
                  Maneja tus citas odontologicas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
