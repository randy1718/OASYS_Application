import React, { Component } from "react";

export default class doctores extends Component {
  constructor() {
    super();
    this.state = {
      doctores: [],
    };
  }

  componentDidMount() {
    console.log("Bienvenido no regreses! :/");
    this.fetchDoctores();
  }

  fetchDoctores() {
    fetch("/getdoctores")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  render() {
    return (
      <div>
        <select
          className="form-select"
          name="idDoctor"
          value={this.state.idDoctor}
          onChange={this.handleChange}
          placeholder="Doctor"
          required
        >
          <option value="0">Doctor</option>
          <option value="920">Dr. Elizabeth</option>
          <option value="922">Dr. Carlos</option>
          
        </select>
      </div>
    );
  }
}
