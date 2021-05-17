import React, { Component } from "react";
import {toast} from 'react-toastify';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Citas from './components/Citas';
import Navegation from "./components/Navegation";
import Inicio from './components/Inicio';
import CreatePaciente from './components/CreatePaciente'
import CreateEmpleado from './components/CreateEmpleado'
import {withRouter} from 'react-router';

toast.configure()

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={withRouter(Inicio)}/>
          <Route path='/citas' component={withRouter(Citas)}/>
          <Route path='/createEmpleado' component={withRouter(CreateEmpleado)}/>
          <Route path='/createPaciente' component={withRouter(CreatePaciente)}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
