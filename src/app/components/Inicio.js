import React, { Component } from 'react'
import Navegation from "./Navegation";
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class Inicio extends Component {
    render() {
        return (
            <Router>
               <Navegation/> 
            </Router>
        )
    }
}
