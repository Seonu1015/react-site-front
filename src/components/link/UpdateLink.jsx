import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, CloseButton, Col, Form, Modal, Row } from "react-bootstrap";
import { CgAddR } from "react-icons/cg";
import { HiInformationCircle } from "react-icons/hi";

const UpdateLink = ({ linkid }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [catList, setCatList] = useState([]);
  const [form, setForm] = useState({
    categoryId: "",
    user: sessionStorage.getItem("email"),
    linkName: "",
    link: "",
  });
  const { categoryId, linkName, link } = form;

  const getCatList = async () => {
    const res = await axios("/cat/list", {
      params: { user: sessionStorage.getItem("email") },
    });
    // console.log(res.data);
    setCatList(res.data);
  };

  const getLinkInfo = async () => {
    const res = await axios("/link/read?linkId=" + linkid);
    // console.log(res.data);
    setForm(res.data);
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (linkName === "") {
      alert("해당 링크의 이름을 작성해주세요!");
    } else if (categoryId === "") {
      alert("카테고리를 선택해주세요!");
    } else if (link === "") {
      alert("링크가 입력되지 않았습니다!");
    } else {
      if (window.confirm("해당 링크를 수정하시겠습니까?")) {
        await axios.post("/link/update", form);
        alert("링크가 수정되었습니다.");
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    getCatList();
    getLinkInfo();
  }, []);

  return (
    <>
      <HiInformationCircle
        className="me-1"
        style={{ fontSize: "1.2rem", color: "green", cursor: "pointer" }}
        onClick={handleShow}
      />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Body>
          <div className="text-end mb-2">
            <CloseButton onClick={handleClose} />
          </div>
          <Form onSubmit={onSubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="1" className="text-center">
                이름
              </Form.Label>
              <Col sm="11">
                <Form.Control
                  name="linkName"
                  value={linkName}
                  onChange={onChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="1" className="text-center">
                폴더
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  aria-label="Default select example"
                  value={categoryId}
                  onChange={(e) =>
                    setForm({ ...form, categoryId: e.target.value })
                  }
                >
                  <option>카테고리를 선택하세요</option>
                  {catList.map((c) => (
                    <option key={c.categoryId} value={c.categoryId}>
                      {c.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                <CgAddR style={{ fontSize: "1.8rem", color: "lightgrey" }} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="1" className="text-center">
                링크
              </Form.Label>
              <Col sm="11">
                <Form.Control
                  name="link"
                  placeholder="https://..."
                  value={link}
                  onChange={onChange}
                />
              </Col>
            </Form.Group>
            <div className="text-end">
              <Button
                variant="outline-secondary"
                className="w-25"
                type="submit"
              >
                수정
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateLink;
