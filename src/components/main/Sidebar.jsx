import React from "react";
import { Accordion, Container, ListGroup, NavLink } from "react-bootstrap";

const Sidebar = () => {
  return (
    <Container className="mt-3" style={{ height: "68vh" }}>
      <Accordion defaultActiveKey={["0"]} alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div style={{ fontWeight: "bold" }}>My Link</div>
          </Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <NavLink href="/">ALL</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>카테고리1</ListGroup.Item>
              <ListGroup.Item>카테고리2</ListGroup.Item>
              <ListGroup.Item>카테고리3</ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div style={{ fontWeight: "bold" }}>Setting</div>
          </Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>폴더 관리</ListGroup.Item>
              <ListGroup.Item>
                <NavLink href="/user/update">정보 수정</NavLink>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Sidebar;
