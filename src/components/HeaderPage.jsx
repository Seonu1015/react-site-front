import React from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import SignModal from "./user/SignModal";

const HeaderPage = () => {
  const onLogout = (e) => {
    e.preventDefault();
    if (window.confirm("로그아웃하시겠습니까?")) {
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <Navbar fixed="top" style={{ backgroundColor: "#ffffff" }}>
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={process.env.PUBLIC_URL + "/logo192.png"}
            alt="logo"
            width="40px"
            className="ms-3"
          />
        </Navbar.Brand>
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link href="/">Linket</Nav.Link>
        </Nav>
        {sessionStorage.getItem("email") ? (
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              {sessionStorage.getItem("email")}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">회원정보</Dropdown.Item>
              <Dropdown.Item onClick={onLogout}>로그아웃</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <SignModal />
        )}
      </Container>
    </Navbar>
  );
};

export default HeaderPage;
