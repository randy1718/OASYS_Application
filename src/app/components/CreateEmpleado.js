import React, { Component, useState, useEffect } from "react";
import Navegation from "./Navegation";

export default function CreateEmpleado() {
  const [empleado, setEmpleado] = useState({
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

  const [empleados, setEmpleados] =useState({
    empleados:[]
  });

  const addEmpleado = (e) => {
    console.log(empleado);
    fetch("/empleados", {
      method: "POST",
      body: JSON.stringify(empleado),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data), alert("Empleado creado exitosamente!");
        setEmpleado({
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
  };

  useEffect(() => {
    console.log("Bienvenido no regreses! :/");
    fetchEmpleados();
  }, []);

  const fetchEmpleados = () => {
    fetch("/empleados")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmpleados({
          empleados: data
        })
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(e.target.name);
  };

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
                    <form onSubmit={addEmpleado}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="fullname"
                          value={empleado.fullname}
                          onChange={handleChange}
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
                          value={empleado.username}
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
                          value={empleado.password}
                          onChange={handleChange}
                          placeholder="Contraseña"
                          autoFocus
                          required
                        />
                      </div>
                      <div className="form-group">
                        <select
                          className="form-select"
                          name="idTipoDNI"
                          value={empleado.idTipoDNI}
                          onChange={handleChange}
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
                          value={empleado.dni}
                          onChange={handleChange}
                          placeholder="Documento de identidad"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <select
                          className="form-select"
                          name="idGenero"
                          value={empleado.idGenero}
                          onChange={handleChange}
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
                          value={empleado.idTipoEmpleado}
                          onChange={handleChange}
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
                          value={empleado.email}
                          onChange={handleChange}
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          name="cellphone"
                          value={empleado.cellphone}
                          onChange={handleChange}
                          placeholder="Celular"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control"
                          name="birthDate"
                          value={empleado.birthDate}
                          onChange={handleChange}
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
              <div className="col-md-6 mx-auto">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
