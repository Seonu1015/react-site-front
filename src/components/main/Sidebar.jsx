import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion, Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [catList, setCatList] = useState([]);

  const getList = async () => {
    const res = await axios("/cat/list", {
      params: { user: sessionStorage.getItem("email") },
    });
    // console.log(res.data);
    setCatList(res.data);
  };

  useEffect(() => {
    if (sessionStorage.getItem("email")) {
      getList();
    }
  }, []);

  return (
    <Container className="mt-3" style={{ height: "68vh", paddingTop: "10vh" }}>
      <Accordion alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div style={{ fontWeight: "bold" }}>Link</div>
          </Accordion.Header>
          <Accordion.Body>
            {sessionStorage.getItem("email") ? (
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Link className="catlink" to="">
                    ALL
                  </Link>
                </ListGroup.Item>
                {catList.map((l) => (
                  <ListGroup.Item key={l.categoryId}>
                    <Link className="catlink" to={`flt/${l.categoryId}`}>
                      {l.categoryName}
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div style={{ color: "gray" }}>로그인을 해주세요!</div>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div style={{ fontWeight: "bold" }}>Setting</div>
          </Accordion.Header>
          <Accordion.Body>
            {sessionStorage.getItem("email") ? (
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Link className="catlink" to="ml">
                    링크 관리
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link className="catlink" to="mc">
                    카테고리 관리
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            ) : (
              <div style={{ color: "gray" }}>로그인을 해주세요!</div>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Sidebar;
