import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/UserProfile.css";
import Loader from "../components/Loader";
import Header from "../components/Header";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Container, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const UserProfile = () => {
  const { user, isLoading } = useSelector((state) => state.signUp);
  const navigate = useNavigate();
  const handleNavigateUserOrder = () => {
    navigate("/user/order");
  };
  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-center">User Profile</h2>
            <Row className="my-5">
              <Col md={6}>
                <Image
                  className="avatar"
                  src={user.avatar?.url}
                  alt={user.username}
                  roundedCircle
                />
                <Row className="my-3 mx-4">
                  <Col>
                    <Button
                      variant="info"
                      onClick={() => navigate("/update/user/profile")}
                    >
                      Edit Profile
                    </Button>
                  </Col>
                </Row>
              </Col>

              <Col md={3}>
                <ListGroup>
                  <ListGroup.Item variant="success">
                    <h5>Full Name: {user.username}</h5>{" "}
                  </ListGroup.Item>
                  <ListGroup.Item variant="success">
                    <h5>Mobile No: {user.mobile}</h5>
                  </ListGroup.Item>
                  <ListGroup.Item variant="success">
                    <h5>Email Address: {user.email}</h5>
                  </ListGroup.Item>
                  <ListGroup.Item variant="success">
                    <h5>
                      Joined On: {String(user?.createdAt).substring(0, 10)}
                    </h5>
                  </ListGroup.Item>

                  <ListGroup.Item variant="success">
                    {user.role !== "admin" && (
                      <Button
                        variant="warning" className="mx-auto d-block"
                        onClick={handleNavigateUserOrder}
                      >
                        My Orders
                      </Button>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default UserProfile;
