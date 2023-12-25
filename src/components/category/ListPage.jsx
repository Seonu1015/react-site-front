import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row, Stack } from "react-bootstrap";

import { BiSolidCategory } from "react-icons/bi";
import { FaRegFolderOpen } from "react-icons/fa";

const ListPage = () => {
  const [catList, setCatList] = useState([]);
  const [linkList, setLinkList] = useState([]);

  const getLinkList = async (categoryId) => {
    const res2 = await axios("/link/list_flt", {
      params: {
        user: sessionStorage.getItem("email"),
        categoryId: categoryId,
      },
    });
    // console.log(res2.data);
    setLinkList(res2.data);
  };

  const getCatList = async () => {
    const res = await axios("/cat/list", {
      params: { user: sessionStorage.getItem("email") },
    });
    // console.log(res1.data);
    setCatList(res.data);

    for (const category of res.data) {
      const categoryId = category.categoryId;
      const linksForCategory = await getLinkList(categoryId); // 해당 카테고리에 속하는 링크 리스트 가져오기
      category.links = linksForCategory; // 카테고리 객체에 링크 리스트 추가
    }
    setCatList(res.data);
  };

  useEffect(() => {
    getCatList();
  }, []);

  return (
    <Container className="mt-4" style={{ paddingTop: "3rem" }}>
      <h3>
        <Stack direction="horizontal" gap={3}>
          <BiSolidCategory style={{ fontSize: "3rem" }} />
          <div>{sessionStorage.getItem("email")}</div>
        </Stack>
      </h3>
      <Row className="justify-content-center">
        <Col md={9}>
          <ListGroup variant="flush" className="mt-3">
            {catList.map((c) => (
              <ListGroup.Item key={c.categoryId}>
                <FaRegFolderOpen className="me-2" />
                {c.categoryName}
                <ListGroup>
                  {c.links &&
                    c.links.map((l) => (
                      <ListGroup.Item key={l.linkId}>
                        {l.linkName}
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ListPage;
