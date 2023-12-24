import axios from "axios";
import React, { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("아이디를 입력하세요!");
    } else if (password === "") {
      alert("비밀번호를 입력해주세요!");
    } else if (password.length < "8") {
      alert("비밀번호를 8자 이상 입력해주세요!");
    } else {
      const res = await axios.post("/user/login", form);
      // console.log(res.data);
      if (res.data === 0) {
        if (window.confirm("회원 가입을 진행하시겠습니까?")) {
          // console.log(form);
          await axios.post("/user/insert", form);
          alert("회원가입을 환영합니다!");
          window.location.href = "/";
        }
      } else {
        alert("아이디가 이미 존재합니다!");
      }
    }
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col
          md={7}
          className="mt-5 text-center px-5"
          style={{ paddingTop: "5%" }}
        >
          <h1 className="mt-3 mb-5">SIGN UP</h1>
          <form onSubmit={onSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-5"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                onChange={onChange}
              />
            </FloatingLabel>
            <FloatingLabel
              className="mb-5"
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
            <Button
              className="w-100 mb-5"
              variant="secondary"
              size="lg"
              type="submit"
            >
              회원가입
            </Button>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default SignUp;
