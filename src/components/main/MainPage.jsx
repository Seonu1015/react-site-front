import React, { useEffect, useState } from "react";
import InsertLink from "../link/InsertLink";
import ListPage from "../link/ListPage";
import { Accordion, Container, Spinner } from "react-bootstrap";
import axios from "axios";

const MainPage = () => {
  const [loading, setLoadiing] = useState(false);
  const [list, setList] = useState([]);

  const getList = async () => {
    setLoadiing(true);
    const res = await axios("/link/list_all", {
      params: {
        user: sessionStorage.getItem("email"),
      },
    });
    // console.log(res.data);
    setList(res.data);
    setLoadiing(false);
  };

  useEffect(() => {
    getList();
  }, []);

  if (loading)
    return (
      <div className="mt-5 text-center" style={{ paddingTop: "4rem" }}>
        <Spinner animation="grow" size="sm" /> <Spinner animation="grow" />
      </div>
    );

  return (
    <>
      <Container style={{ paddingTop: "4rem" }}>
        <Accordion className="shadow-sm">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <strong>Add Link</strong>
            </Accordion.Header>
            <Accordion.Body>
              <InsertLink buttonText="추가" list={list} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>

      <ListPage list={list} />
    </>
  );
};

export default MainPage;
