import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/esm/Image";
import { userSignIn } from "../redux/thunk/userThunk";
import { useDispatch, useSelector} from "react-redux";

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const dispatch= useDispatch();
  let [signin, setSignin] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();
 
  const {success} = useSelector((state)=>state.signIn)

const redirect = location.search ? location.search.split("=")[1] : "/";
  //validation function:
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "! Enter your mail";
    } else if (!regex.test(values.email)) {
      errors.email = "! This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "! Enter your password";
    } 
    else if (values.password.length < 6) {
      errors.password = "! Password should at least 6 characters";
    }
    return errors;
  };

  const handleSubmit = async(e) => {
e.preventDefault();
try {
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  const validationErrors = validate(signin);
      setErrorMessage(validationErrors);
      console.log(validationErrors)
      if (Object.keys(validationErrors).length === 0) {
  
           await dispatch(userSignIn(signin));
           navigate(redirect);
setSignin({
email: "",
password: "",
});

      }

setValidated(true);
} catch (error) {
  console.log(error.message);
}
  };

  const handleChange = (e) => {
    setSignin({ ...signin, [e.target.name]: e.target.value });
  };

  const goToSignUp=()=>{
    navigate("/signup")
  }

  
  useEffect(()=>{
    if (success) {
      navigate(redirect)
  }
  },[redirect,navigate,success])

  



  return (
    <Container className="py-4 " fluid>
      <Row className="justify-content-md-center mb-4">
        <Col md="auto">
          <Link to="/">
          <Image
            width="100"
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          /></Link>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title>
                <h2>Sign In</h2>
              </Card.Title>

              <>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3 w-70">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter Email"
                      size="sm"
                      name="email"
                      value={signin.email}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessage.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 w-70">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="At least 6 character"
                      size="sm"
                      name="password"
                      value={signin.password}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessage.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Container className="d-grid gap-2">
                    <Button type="submit" variant="warning" size="lg" style={{fontSize:"14px"}} >
                      Continue
                    </Button>
                  </Container>
                  <br />

                  <>
                    <span>
                      By continuing, you agree to Amazon's{" "}
                      <Link to="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940">
                        Conditions of Use
                      </Link>{" "}
                      and{" "}
                      <Link to="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380">
                        Privacy Notice.
                      </Link>
                    </span>
                    <br />
                    <br />
                    <Link>Need Help</Link>
                  </>
                </Form>
              </>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />

      <Row className="justify-content-center">
        <Col md="auto">
          <h6>New to Amazon?</h6>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="auto">
          <Button onClick={goToSignUp} variant="light" size="lg" style={{paddingLeft:"100px",paddingRight:"100px",fontSize:"14px"}}>
            Create your Amazon Account
          </Button>
        </Col>
      </Row>
      <hr />

      <Row className="justify-content-center" style={{ fontSize: "11px" }}>
        <Col md="auto">
          <Link
            to="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_cou?ie=UTF8&nodeId=200545940"
            target="_blank"
          >
            Conditions of use
          </Link>
        </Col>
        <Col md="auto">
          <Link
            to="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_privacy_notice?ie=UTF8&nodeId=200534380"
            target="_blank"
          >
            Privacy Notice
          </Link>
        </Col>
        <Col md="auto">
          <Link
            to="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=508510"
            target="_blank"
          >
            Help
          </Link>
        </Col>
        <p className="text-center">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </p>
      </Row>
    </Container>
  );
};

export default SignIn;
