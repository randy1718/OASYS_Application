import React, { Component } from "react";
import Navegation from "./Navegation";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from "react-router";

export default withRouter(
  class Inicio extends Component {
    constructor() {
      super();
      this.state = {
        user: "",
        password: "",
      };
      this.login = this.login.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    login(e) {
      console.log(this.state);
      fetch("/ingreso", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data), alert("ingreso exitoso!");
          this.setState({
            user: "",
            password: "",
          });
        })
        .catch((err) => console.error(err));

      e.preventDefault();
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
          <div className="boxLogin">
            <div className="jumbotron vertical-center">
              <div className="container">
                <div className="container-md align-items-center">
                  <div className="row">
                    <div className="col-md-4 mx-auto">
                      <div className="card">
                        <div className="card-body">
                          <form onSubmit={this.login}>
                            <h1 className="tituloMain"> OASYS </h1>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                name="user"
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
        </div>
      );
    }
  }
);
