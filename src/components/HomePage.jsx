import React from "react";
import Sidebar from "./main/Sidebar";
import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <Row>
      <Col md={3}>
        <Sidebar />
      </Col>
      <Col>
        <Outlet />
      </Col>
    </Row>
  );
};

export default HomePage;
