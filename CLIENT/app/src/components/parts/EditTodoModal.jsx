import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Input, { Textarea } from "./Input";

const EditTodoModal = ({ show, handleClose, data, handleChange, errors, handleSave, options }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Teendő módosítása</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form action="" method="put" className="row g-3">
        <div className="col-12 col-lg-6">
          <Input
            name={"name"}
            label="Add meg a feladat nevét!"
            onChange={handleChange}
            value={data.name}
          />
          <Error collection={errors} index="name" />
        </div>

        <div className="col-12 col-lg-6">
          <Input
            name={"priority"}
            label="Add meg a feladat priorítását!"
            onChange={handleChange}
            type="select"
            options={options}
            value={data.priority}
          />
          <Error collection={errors} index="priority" />
        </div>

        <div className="col-12 col-lg-6">
          <Input
            name={"date"}
            type="date"
            label="Add meg a feladat határidejét"
            onChange={handleChange}
          />
          <Error collection={errors} index="date" />
        </div>

        <div className="col-12">
          <Textarea
            name={"message"}
            label="Add meg a feladat leírását"
            onChange={handleChange}
          />
          <Error collection={errors} index="message" />
        </div>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Mégse
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Mentés
      </Button>
    </Modal.Footer>
  </Modal>
);

const Error = ({ collection, index }) =>
  collection[index] && collection[index].length > 0 ? (
    <span className="text-danger">{collection[index][0]}</span>
  ) : (
    ""
  );

export default EditTodoModal;
