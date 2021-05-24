import React, { Component } from "react";
import { Redirect } from "react-router";
import Navegation from "./Navegation";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
} from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Navegation />
      <div className="jumbotron vertical-center ">
        <div className="container-md align-items-center">
          <div className="card opcionesIngreso">
            <div className="card-body">
            <div className="saludo">Bienvenido</div>
              <div className="row">
                <div className="col entryCitas">
                  <NavLink to="/citas" className="nav-link seccion">
                    Citas
                  </NavLink>
                </div>
                <div className="col entryEmpleados">
                  <NavLink to="/createEmpleado" className="nav-link seccion">
                    Empleados
                  </NavLink>
                </div>
                <div className="col entryPacientes">
                  <NavLink to="/createPaciente" className="nav-link seccion">
                    Pacientes
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
