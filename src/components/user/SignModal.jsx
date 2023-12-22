import React, { useState } from "react";
import { Button, CloseButton, Modal } from "react-bootstrap";
import SignIn from "./SignIn";

const SignModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark me-3" onClick={handleShow}>
        Sign In
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <div className="text-end">
            <CloseButton onClick={handleClose} />
          </div>
          <SignIn />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignModal;
