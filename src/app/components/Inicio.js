import React, { Component,useState } from "react";
import Home from "./Home";
import auth from "./auth";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { withRouter } from "react-router";

export default function Inicio() {
  let history = useHistory();
  const [state, setState] =useState({
    user: "",
    password: "",
  });

  const login = (e) => {
    console.log(state);
    fetch("/ingreso", {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Los datos son:'),
        console.log(data)
        if (Object.keys(data).length == 1){
          auth.login(() => {
            history.push('/home');
          });
        }else{
          alert('El usuario o la contraseña son incorrectos!');
        }


      })
      .catch((err) => console.error(err));

    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

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
                      <form onSubmit={login}>
                        <h1 className="tituloMain"> OASYS </h1>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="user"
                            value={state.user}
                            onChange={handleChange}
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
                            value={state.password}
                            onChange={handleChange}
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
