import React, { useState } from "react";
import Navegation from "./Navegation";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import Button from "react-bootstrap/Button";

export default function Citas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Mensaje = () => (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="example-custom-modal-styling-title"
      centered
      onHide={handleClose}
    >
      <ModalHeader closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div>
      <Navegation />
      <Mensaje />

      <Button variant="primary" onClick={handleShow}>
        Ventana emergente
      </Button>
    </div>
  );
}
