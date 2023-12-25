import axios from "axios";
import React, { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import GoogleLogin from "./GoogleLogin";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    const res = await axios.post("/user/login", form);
    if (res.data === 0) {
      alert("아이디가 존재하지 않습니다.");
    } else if (res.data === 2) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      sessionStorage.setItem("email", email);
      alert("로그인 성공!");
      window.location.href = "/";
    }
  };

  return (
    <>
      <h1 className="text-center mb-3">SIGN IN</h1>
      <form onSubmit={onSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="my-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            onChange={onChange}
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-3"
          controlId="floatingPassword"
          label="Password"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
          />
        </FloatingLabel>
        <div className="text-end pe-2 mb-3">
          <a href="/join">I'm a new user! Sign Up</a>
        </div>
        <Button
          className="w-100 mb-3"
          variant="secondary"
          size="lg"
          type="submit"
        >
          로그인
        </Button>
      </form>
      <Row className="mb-3">
        <Col>
          <GoogleLogin />
        </Col>
        <Col>
          <Button
            className="w-100 d-flex justify-content-center align-items-center"
            variant="outline-dark"
            size="lg"
          >
            <FaGithub className="me-2" />
            Github
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;
