import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const MainPage = () => {
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="h-100 border-end px-0 bg-light flex-column d-flex">
          <Channels />
        </Col>
        <Col className="p-0 h-100">
          <Chat />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
