import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/thunk/productThunk";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/HomePage.css";
import Image from "react-bootstrap/esm/Image";
import Header from "../components/Header";
import "../css/ProductDetails.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Rating from "../components/Rating";
import { items_Add_To_Cart } from "../redux/slice/cartSlice";

const ProductDetails = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();
  const { productDetails, isLoading, error } = useSelector((state) => ({
    ...state.products,
  }));

  const addToCartHandler=()=>{
    dispatch(items_Add_To_Cart({...productDetails,qty}));
    navigate("/cart")
  }
  useEffect(() => {
    if (_id) {
      dispatch(getSingleProduct(_id));
     
    }
  }, [_id]);

  if (isLoading) {
    return;
    <Container>
      <Row className="justify-content-center">
        <Col md="auto">
          <Spinner animation="border" variant="primary" className="spinner" />
        </Col>
      </Row>
    </Container>;
  }
  return (
    <>
      <Header />
      <Container style={{ marginTop: "6rem" }}>
      
        <Row className="my-3">
          <Col md={6}>
            <Image src={productDetails.image} alt={productDetails.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup>
              <ListGroup.Item>
                <h3>{productDetails.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={productDetails.rating}
                text = {`${productDetails.numReviews} reviews`}
                
                />


               
              </ListGroup.Item>

              <ListGroup.Item>Price: ₹{productDetails.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {productDetails.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>₹{productDetails.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {productDetails.countInStock > 0 ? (
                        <strong className="text-success">In Stock</strong>
                      ) : (
                        <strong className="text-error">Out Of Stock</strong>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/* Qty Select */}
                {productDetails.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(Math.min(50,productDetails.countInStock)).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <div className="d-grid gap-2">
                    <Button variant="warning" size="sm" type="button"  disabled={productDetails.countInStock === 0}  onClick={addToCartHandler}>
                      Add To Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
