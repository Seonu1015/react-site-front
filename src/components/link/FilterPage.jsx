import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { HiExternalLink, HiMinusCircle } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import UpdateLink from "./UpdateLink";
import { FaRegFolderOpen } from "react-icons/fa";
import axios from "axios";

const FilterPage = () => {
  const [list, setList] = useState([]);

  // pathname = flt/1 의 categoryId 인 1 받아오기
  const location = useLocation();
  const catId = location.pathname.split("/")[2];
  // console.log(catId);

  const getList = async () => {
    const res = await axios("/link/list_flt", {
      params: {
        user: sessionStorage.getItem("email"),
        categoryId: catId,
      },
    });
    // console.log(res.data);
    setList(res.data);
    console.log(list[0]);
  };

  const onDeleteLink = async (linkId, linkName) => {
    const parsedLinkId = parseInt(linkId);
    if (window.confirm(`해당 링크를 삭제하시겠습니까?\n▶ ${linkName}`)) {
      await axios.post("/link/delete", parsedLinkId, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("삭제 완료!");
      getList();
    }
  };

  useEffect(() => {
    getList();
  }, [location]);

  return (
    <Container style={{ paddingTop: "4rem" }}>
      <Row>
        {list.map((l) => (
          <Col key={l.linkId} md={6}>
            <Card border="light" className="shadow-sm mb-3">
              <Card.Body>
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
                      style={{
                        fontSize: "1.2rem",
                        color: "tomato",
                        cursor: "pointer",
                      }}
                      onClick={() => onDeleteLink(l.linkId, l.linkName)}
                    />
                  </div>
                </Stack>
                <div style={{ color: "gray", fontSize: "0.8rem" }}>
                  <FaRegFolderOpen /> {l.categoryName}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FilterPage;
