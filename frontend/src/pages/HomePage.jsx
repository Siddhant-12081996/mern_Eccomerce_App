import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCarousel from "../components/ProductCarousel";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, getSingleProduct } from "../redux/thunk/productThunk";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import "../css/HomePage.css"
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { isLoading, error, products_Array } = useSelector(
    (state) => state.products
  );
const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const goToSingleProduct=(_id)=>{
    navigate(`/product/${_id}`)
  }

  if (isLoading) {
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
      </Container>
    );
  }
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <ProductCarousel />
      <Container>
        <Row>
          {products_Array.map((items, index) => (
            <Col key={index} md={3}>
              <Card
                className="my-3 d-flex justify-content-center align-items-center text-center"
                style={{ height: "450px" }}
              >
                <Card.Img
                  variant="top"
                  src={items.image}
                  style={{ width: "160px",border:"1px solid black",cursor:"pointer" }} onClick={()=>goToSingleProduct(items._id)}
                />

                <Card.Body>
                  <Card.Title onClick={()=>goToSingleProduct(items._id)} style={{ fontSize: "13px",cursor:"pointer"}}>
                    {items.name}
                  </Card.Title>
                  <Card.Text>
                    <FaStar size="1rem" color="f8e825" /> {items.rating}
                  </Card.Text>
                  <Card.Text style={{ fontSize: "13px" }}>
                    Price: ₹ {items.price}
                  </Card.Text>
                </Card.Body>
                {/* <Card.Footer className="w-100">
                  <Button variant="warning" size="sm">
                    Show details
                  </Button> 
                </Card.Footer>*/}
              </Card>
            </Col>
          ))}
        </Row>
<Row className="justify-content-center">
  <Col md="auto">
  <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  </Col>
</Row>
       
      </Container>
    </div>
  );
};

export default HomePage;
