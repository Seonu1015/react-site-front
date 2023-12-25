import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, ListGroup, Row, Stack } from "react-bootstrap";

import { BiSolidCategory } from "react-icons/bi";
import { FaRegFolderOpen } from "react-icons/fa";
import {
  FaCircleCheck,
  FaCircleExclamation,
  FaCircleMinus,
  FaCircleXmark,
} from "react-icons/fa6";
import InsertCategory from "./InsertCategory";

const ListPage = () => {
  const [catList, setCatList] = useState([]);

  const getCatList = async () => {
    const res = await axios("/cat/list", {
      params: { user: sessionStorage.getItem("email") },
    });
    // console.log(res1.data);
    let list = res.data;
    list = list.map((c) => c && { ...c, isEdit: false });
    setCatList(list);
  };

  const onClickUpdate = (categoryId) => {
    // console.log(categoryId);
    const list = catList.map((c) =>
      c.categoryId === categoryId ? { ...c, isEdit: true } : c
    );
    setCatList(list);
  };

  const onClickCancle = (categoryId) => {
    const list = catList.map((c) =>
      c.categoryId === categoryId ? { ...c, isEdit: false } : c
    );
    setCatList(list);
  };

  const onChange = (e, categoryId) => {
    const list = catList.map((c) =>
      c.categoryId === categoryId ? { ...c, categoryName: e.target.value } : c
    );
    setCatList(list);
  };

  const onUpdate = async (categoryId, categoryName) => {
    // console.log(categoryId + "\n" + categoryName);
    await axios.post("/cat/update", { categoryId, categoryName });
    getCatList();
  };

  const onDelete = async (categoryId, categoryName) => {
    const res = await axios("/link/total?categoryId=" + categoryId);
    console.log(res.data);
    if (res.data > 0) {
      alert(
        `해당 카테고리에 등록된 링크가 "${res.data}"개 존재합니다.\n\n링크를 다른 카테고리로 이동 후\n다시 삭제를 진행해주세요!`
      );
    } else {
      if (
        window.confirm("[" + categoryName + "] 카테고리를 삭제하시겠습니까?")
      ) {
        await axios.post("/cat/delete", categoryId, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        getCatList();
      }
    }
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
        <Col md={10}>
          <ListGroup variant="flush" className="mt-3">
            {catList.map((c) => (
              <ListGroup.Item key={c.categoryId}>
                <Row>
                  <Col xs="auto">
                    <FaRegFolderOpen
                      className="me-2"
                      style={{
                        fontSize: "1.3rem",
                        color: "gray",
                      }}
                    />
                  </Col>
                  <Col>
                    {c.isEdit ? (
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Normal text"
                        className="w-25"
                        value={c.categoryName}
                        onChange={(e) => onChange(e, c.categoryId)}
                      />
                    ) : (
                      c.categoryName
                    )}
                  </Col>
                  <Col md={2} className="text-end pe-1">
                    {c.isEdit ? (
                      <>
                        <FaCircleCheck
                          className="me-2"
                          style={{
                            fontSize: "1.2rem",
                            color: "green",
                            cursor: "pointer",
                          }}
                          onClick={() => onUpdate(c.categoryId, c.categoryName)}
                        />
                        <FaCircleXmark
                          style={{
                            fontSize: "1.2rem",
                            color: "gray",
                            cursor: "pointer",
                          }}
                          onClick={() => onClickCancle(c.categoryId)}
                        />
                      </>
                    ) : (
                      <>
                        <FaCircleExclamation
                          className="me-2"
                          style={{
                            fontSize: "1.2rem",
                            color: "green",
                            cursor: "pointer",
                          }}
                          onClick={() => onClickUpdate(c.categoryId)}
                        />
                        <FaCircleMinus
                          style={{
                            fontSize: "1.2rem",
                            color: "tomato",
                            cursor: "pointer",
                          }}
                          onClick={() => onDelete(c.categoryId, c.categoryName)}
                        />
                      </>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

            <ListGroup.Item className="text-end">
              <InsertCategory getList={getCatList} />
              <span className="ms-2" style={{ color: "gray" }}>
                카테고리 추가
              </span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ListPage;
