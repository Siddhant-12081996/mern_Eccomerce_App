import React from "react";
import "../css/CheckoutSteps.css";
import { Nav } from "react-bootstrap";

import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  
  
  return (
    <Nav className="justify-content-center mb-4 color">
      <Nav.Item>
        {step1 ? (
          <Link to="/signin">
            <Nav.Link className={step1 ? "completed-step" : ""}>
              Sign In
            </Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Link to="/shipping">
            <Nav.Link className={step2 ? "completed-step" : ""}>
              Shipping
            </Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Link to="/payment">
            <Nav.Link className={step3 ? "completed-step" : ""}>
              Payment
            </Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <Link to="/placeorder">
            <Nav.Link className={step4 ? "completed-step" : ""}>
              Place Order
            </Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
