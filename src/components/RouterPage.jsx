import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SignUp from "./user/SignUp";
import MainPage from "./main/MainPage";
import { Col, Row, Stack } from "react-bootstrap";
import Sidebar from "./main/Sidebar";

const RouterPage = () => {
  return (
    <Routes>
      {sessionStorage.getItem("email") ? (
        <Route
          path="/"
          element={
            <Row>
              <Col xs={3}>
                <Sidebar />
              </Col>
              <Col>
                <MainPage />
              </Col>
            </Row>
          }
        />
      ) : (
        <Route path="/" element={<HomePage />} />
      )}

      {/* user */}
      <Route path="/join" element={<SignUp />} />
    </Routes>
  );
};

export default RouterPage;
