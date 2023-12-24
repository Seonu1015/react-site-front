import React from "react";
import { Container, Image } from "react-bootstrap";

const StartPage = () => {
  return (
    <Container className="text-center">
      <Image
        src={process.env.PUBLIC_URL + "/image/Search.gif"}
        fluid
        width={500}
      />
    </Container>
  );
};

export default StartPage;
