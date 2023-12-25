import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CgAddR } from "react-icons/cg";

const InsertCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onInsertCat = async (e) => {
    e.preventDefault();
    // alert(categoryName);
    await axios.post("/cat/insert", {
      user: sessionStorage.getItem("email"),
      categoryName,
    });
    alert("[ " + categoryName + " ] 카테고리 추가 완료!");
    setCategoryName("");
    handleClose();
    window.location.href = "/";
  };

  return (
    <>
      <CgAddR
        style={{ fontSize: "1.8rem", color: "lightgrey", cursor: "pointer" }}
        onClick={handleShow}
      />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>카테고리 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>카테고리</Form.Label>
              <Form.Control
                name="categoryName"
                placeholder="카테고리명"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" type="submit" onClick={onInsertCat}>
            추가
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InsertCategory;
