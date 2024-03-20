import React from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import "../css/HomePage.css"
const Loader = () => {
  return (
    <Container>
    <Row className="justify-content-center">
      <Col md="auto">
        <Spinner
          animation="border"
          variant="primary"
          className="spinner"
        />
      </Col>
    </Row>
  </Container>  )
}

export default Loader