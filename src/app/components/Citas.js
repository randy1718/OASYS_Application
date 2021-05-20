import React, { Component } from 'react';
import Navegation from "./Navegation";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "react-bootstrap/Modal";
import {withRouter} from 'react-router';

export default withRouter(class Citas extends Component {

    MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    constante(a) {
        const {modalShow, setModalShow} = React.useState(false);
        setModalShow(a)
        return (modalShow,setModalShow);
    }

    App(){
        //const {modalShow, setModalShow} = React.useState(false);
        return(
        <>
            <div>
                <Navegation/>  
            </div> 
        </>
        );
    }

    render(){
        return(
            <div>
                {this.App()}
            </div>
        )
    }
})
