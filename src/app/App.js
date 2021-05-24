import React, { Component } from "react";
import {toast} from 'react-toastify';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Citas from './components/Citas';
import Agenda from './components/Agenda';
import prueba from './components/asd2';
import Navegation from "./components/Navegation";
import Inicio from './components/Inicio';
import CreatePaciente from './components/CreatePaciente'
import Home from './components/Home'
import CreateEmpleado from './components/CreateEmpleado'
import paginaInicio from './components/PaginaInicio'
import {withRouter} from 'react-router';
import { ProtectedRoute } from "./components/ProtectedRoute";

toast.configure()

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
        <Route path='/' exact component={withRouter(paginaInicio)}/>
          <Route path='/login' exact component={withRouter(Inicio)}/>
          <Route exact path='/home' exact component={withRouter(Home)}/>
          <ProtectedRoute path='/citas' component={withRouter(Agenda)}/>
          <ProtectedRoute path='/prueba' component={withRouter(prueba)}/>
          <ProtectedRoute path='/createEmpleado' component={withRouter(CreateEmpleado)}/>
          <Route path='/createPaciente' component={withRouter(CreatePaciente)}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
