import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "../redux/thunk/userThunk";

const SignUp = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState({});

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { user, success, error, isLoading } = useSelector(
    (state) => state.signUp
  );

  let [signup, setSignup] = useState({
    username: "",
    mobile: "",
    email: "",
    password: "",
    avatar: "",
  });

  const { username, mobile, email, password, image } = signup;
  const [avatar, setAvatar] = useState("/avtar.jpg");
  const [avatarPreview, setAvatarPreview] = useState("/avtar.jpg");

  //validation function:
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "! Enter your name";
    }
    if (!values.mobile) {
      errors.mobile = "! Enter your mobile number";
    }
    if (!values.email) {
      errors.email = "! Enter your mail";
    } else if (!regex.test(values.email)) {
      errors.email = "! This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "! Enter your password";
    } else if (values.password.length < 6) {
      return (errors.password = "! Password should at least 6 characters");
    }
    if (!values.avatar) {
      errors.avatar = "! upload image";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signup);
    try {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        setValidated(true);
      }

      const errors = validate(signup);
      setErrorMessage(errors);

      if (
        Object.keys(errors).length >= 0 &&
        username !== "" &&
        mobile !== "" &&
        email !== "" &&
        password !== "" &&
        avatar !== ""
      ) {
        const myForm = new FormData();
        myForm.set("username", username);
        myForm.set("mobile", mobile);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(userSignUp(myForm));

        navigate("/signin");
      }
    } catch (error) {
      console.log(error.message);
      setValidated(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setSignup({ ...signup, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  return (
    <Container className="py-4 " fluid>
      <Row className="justify-content-md-center mb-4">
        <Col md="auto">
          <Link to="/">
            <Image
              width="100"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            />
          </Link>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title>
                <div>
                  <h2>Create Account</h2>
                </div>
              </Card.Title>

              <>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3 w-70">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First and Last Name"
                      size="sm"
                      name="username"
                      value={username}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessage.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 w-70">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Mobile Number"
                      size="sm "
                      name="mobile"
                      value={mobile}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessage.mobile}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 w-70">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter Email"
                      size="sm"
                      name="email"
                      value={email}
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
                      value={password}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessage.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Row>
                      <Col md={3}>
                        <Image
                          required
                          width="100vw"
                          src={avatarPreview}
                          alt="Avatar Preview"
                          roundedCircle
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          required
                          type="file"
                          className="mt-3"
                          name="avatar"
                          accept="assets/user_avtar*"
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errorMessage.avatar}
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Container className="d-grid gap-2">
                    <Button
                      type="submit"
                      variant="warning"
                      size="lg"
                      style={{ fontSize: "14px" }}
                      disabled={isLoading ? true : false}
                    >
                      Sign up
                    </Button>
                  </Container>
                </Form>
              </>
            </Card.Body>
            <Card.Footer>
              <Container>
                Already have an account? <Link to="/signin">Sign in</Link>
              </Container>
              <br />
              <br />
              <span>
                By creating an account or logging in, you agree to Amazon's
                Conditions of Use and Privacy Policy.
              </span>
            </Card.Footer>
          </Card>
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
        <span className="text-center">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </span>
      </Row>
    </Container>
  );
};

export default SignUp;
