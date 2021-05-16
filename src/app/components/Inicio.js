import React, { Component } from "react";
import Navegation from "./Navegation";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from "react-router";

export default withRouter(
  class Inicio extends Component {
    render() {
      return (
        <div>
          <Navegation />
          <div className="jumbotron vertical-center">
            <div className="container">
              <div className="container-md align-items-center">
                <div className="row">
                  <div className="col-md-5 mx-auto">
                    <div className="card">
                      <div className="card-body">
                        <form onSubmit={this.addTask}>
                          <h1 className="tituloMain"> OASYS </h1>{" "}
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="user"
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
                              placeholder="Contraseña"
                              autoFocus
                              required
                            />
                          </div>
                          <div className="form-group">
                            <div className="d-grid gap-2">
                              <button className="btn btn-success">
                                Ingresar
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
        </div>
      );
    }
  }
);
