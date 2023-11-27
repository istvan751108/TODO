import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import TodoUp from "../TodoUp";

const TodoUpModal = ({ show, handleClose, onSuccess }) => {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      handleClose();
    }
  }, [success, handleClose]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Új Teendő felvitele</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <TodoUp
          onSuccess={() => setSuccess(true)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default TodoUpModal;
