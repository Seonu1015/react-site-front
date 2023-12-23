import React from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";

import { HiExternalLink } from "react-icons/hi";
import { HiMinusCircle } from "react-icons/hi";
import { FaRegFolderOpen } from "react-icons/fa";

import UpdateLink from "./UpdateLink";
import axios from "axios";

const ListPage = ({ list }) => {
  const onDeleteLink = async (linkId, linkName) => {
    const parsedLinkId = parseInt(linkId);
    if (window.confirm(`해당 링크를 삭제하시겠습니까?\n▶ ${linkName}`)) {
      await axios.post("/link/delete", parsedLinkId, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("삭제 완료!");
      window.location.href = "/";
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        {list.map((l) => (
          <Col key={l.linkId} md={6}>
            <Card border="light" className="shadow-sm mb-3">
              <Card.Body>
                <Card.Title>
                  <Stack direction="horizontal" gap={2}>
                    {l.linkName}
                    <a href={l.link} target="_blank" rel="noreferrer">
                      <HiExternalLink
                        className="d-flex align-items-center"
                        style={{ fontSize: "1.2rem", color: "steelblue" }}
                      />
                    </a>
                    <div className="ms-auto">
                      <UpdateLink linkid={l.linkId} />
                      <HiMinusCircle
                        style={{ fontSize: "1.2rem", color: "tomato" }}
                        onClick={() => onDeleteLink(l.linkId, l.linkName)}
                      />
                    </div>
                  </Stack>
                </Card.Title>
                <Card.Subtitle className="mb-1 text-muted">
                  <FaRegFolderOpen /> {l.categoryName}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListPage;
