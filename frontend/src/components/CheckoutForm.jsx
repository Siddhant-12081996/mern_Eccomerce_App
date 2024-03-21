import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
} from "react-bootstrap";
import { useSelector } from "react-redux";

import Loader from "../components/Loader";
import Header from "../components/Header";

import CheckoutSteps from "./CheckoutSteps";

const CheckoutForm = () => {
  const navigate = useNavigate();

  const cart_Array = useSelector((state) => state.cart);

  const { isLoading, error } = useSelector((state) => state.order);
  useEffect(() => {
    if (!cart_Array.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart_Array.paymentMethod) {
      navigate("/payment");
    }
  }, [cart_Array.paymentMethod, cart_Array.shippingAddress.address, navigate]);

  const placeOrderHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("https://mern-eccomerce-app.onrender.com/api/getkey");
    const {
      data: { order },
    } = await axios.post("https://mern-eccomerce-app.onrender.com/checkout", { amount });
    console.log(window);
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "SB",
      description: "Razorpay tutorial",
      image: "https://avatars.githubusercontent.com/u/107465215?v=4",
      order_id: order.id,
      callback_url: "https://mern-eccomerce-app.onrender.com/paymentverification",
      prefill: {
        name: "Siddhant Bobde",
        email: "admin@gmail.com",
        contact: "9000090000",
      },
      notes: {
        address: "razorapy official",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
    console.log(options);
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <CheckoutSteps step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart_Array.shippingAddress.address},{" "}
                {cart_Array.shippingAddress.city}
                {cart_Array.shippingAddress.postalCode},
                {cart_Array.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart_Array.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart_Array.cart_Array.length === 0 ? (
                <Alert varient="primary">Your cart is empty</Alert>
              ) : (
                <ListGroup variant="flush">
                  {cart_Array.cart_Array.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹
                          {(item.qty * (item.price * 100)) / 100}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{cart_Array.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{cart_Array.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{cart_Array.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{cart_Array.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Alert variant="danger">{error.data.message}</Alert>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  onClick={() => placeOrderHandler(cart_Array.totalPrice)}
                >
                  Place order
                </Button>

                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CheckoutForm;
