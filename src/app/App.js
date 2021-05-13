import React, { Component } from "react";
import {toast} from 'react-toastify';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Citas from './components/Citas';
import Navegation from "./components/Navegation";
import Inicio from './components/Inicio';
import CreatePaciente from './components/CreatePaciente'

toast.configure()

class App extends Component {
  
  render() {
    return (
      <Router>
        <Route path='/' exact component={CreatePaciente}/>
      </Router>
    );
  }
}

export default App;
