import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Image from "react-bootstrap/Image";
import "../css/Header.css";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/thunk/userThunk";
import Badge from "react-bootstrap/Badge";
import User from "./User";
import { useState } from "react";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  const { cart_Array } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.signUp);

  const goToSignIn = () => {
    navigate("/signin");
  };

  
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      fixed="top"
      expand="xl"
      collapseOnSelect
    >
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <Image
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Logo"
              style={{ width: "75px", marginTop: "10px" }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
          data-bs-theme="dark"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
              Hellow sign In
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link>Update Location</Nav.Link>
              <Nav.Link>
                <DropdownButton
                  variant="secondary"
                  data-bs-theme="light"
                  title="All"
                >
                  <Dropdown.Item eventKey="1">All Categories</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Furniture</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Man T-shirt</Dropdown.Item>
                  <Dropdown.Item eventKey="4">Women's Cloth</Dropdown.Item>
                  <Dropdown.Item eventKey="5">Wathes</Dropdown.Item>
                  <Dropdown.Item eventKey="6">Shoes</Dropdown.Item>
                  <Dropdown.Item eventKey="7">Mobile</Dropdown.Item>
                  <Dropdown.Item eventKey="8">Laptop</Dropdown.Item>
                  <Dropdown.Item eventKey="9">Baby Products</Dropdown.Item>
                  <Dropdown.Item eventKey="10">Camera</Dropdown.Item>
                  <Dropdown.Item eventKey="11">Electronic</Dropdown.Item>
                  <Dropdown.Item eventKey="12">
                    Musical Instrument
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="13">Baby Products</Dropdown.Item>
                  <Dropdown.Item eventKey="14">Audio</Dropdown.Item>
                  <Dropdown.Item eventKey="15">Smart Technology</Dropdown.Item>
                  <Dropdown.Item eventKey="16">Wathes</Dropdown.Item>
                  <Dropdown.Item eventKey="17">Home & Kitchen</Dropdown.Item>
                  <Dropdown.Item eventKey="18">Garden & Outdoor</Dropdown.Item>
                  <Dropdown.Item eventKey="19">Fitness</Dropdown.Item>
                  <Dropdown.Item eventKey="20">Luxury Beauty</Dropdown.Item>
                </DropdownButton>
              </Nav.Link>
            </Nav>
            <Form className="d-flex mt-2" style={{ height: "40px" }}>
              <Form.Control
                type="text"
                placeholder="Search Amazon.in"
                className="inputbox"
              />

              <Button className="buttonSearch">
                <Image
                  width="20"
                  src="https://img.icons8.com/ios/50/search--v1.png"
                  alt="search--v1"
                />
              </Button>
            </Form>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link>
                <Image
                  height="15"
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                  alt="flag"
                />
              </Nav.Link>
              <NavDropdown
                id="collapsible-nav-dropdown"
                title="EN"
                variant="secondary"
                data-bs-theme="light"
              >
                <NavDropdown.Item>
                  <Form.Check
                    name="group1"
                    type="radio"
                    label="English-EN"
                    aria-label="radio 1"
                  />
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">
                  <Form.Check
                    name="group1"
                    type="radio"
                    label="हिन्दी - HI - अनुवाद"
                    aria-label="radio 1"
                  />
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">
                  <Form.Check
                    name="group1"
                    type="radio"
                    label="தமிழ் - TA - மொழிபெயர்ப்பு"
                    aria-label="radio 1"
                  />
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">
                  <Form.Check
                    name="group1"
                    type="radio"
                    label="తెలుగు - TE - అనువాదం"
                    aria-label="radio 1"
                  />
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">
                  <Form.Check
                    name="group1"
                    type="radio"
                    label="ಕನ್ನಡ - KN - ಭಾಷಾಂತರ"
                    aria-label="radio 1"
                  />
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">
                  <Form.Check
                    name="group1"
                    type="radio"
                    label="മലയാളം - ML - വിവർത്തനം"
                    aria-label="radio 1"
                  />
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">
                  <Form.Check
                    name="group1"
                    type="radio"
                    label="বাংলা - BN - অনুবাদ"
                    aria-label="radio 1"
                  />
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">
                  <Form.Check
                    name="group1"
                    type="radio"
                    label="मराठी - MR - भाषांतर"
                    aria-label="radio 1"
                  />
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://www.amazon.in/hz/cs/help?ref_=icp_language_help&nodeId=GARKQZZYZ542RGWK"
                  className=" linkName"
                >
                  Learn More
                </NavDropdown.Item>
              </NavDropdown>

              <OverlayTrigger
               show={show}
               target={target}
               
                placement="bottom"
                delay={{ show: 750, hide: 1000 }}
                overlay={
                  <Tooltip id="tooltip">
                    <div>
                      <div className="d-grid gap-2">
                        <Button variant="warning" onClick={goToSignIn}>
                          Sign in
                        </Button>
                      </div>
                      <p>
                        New Customer? <Link to="/signup">start here</Link>
                      </p>
                      
                    </div>
                  </Tooltip>
                }
              >
                <Nav.Link>
                  Hellow,{user.username} Account & List
                  <Image
                    onClick={handleClick}
                    
                    width="25"
                    height="15"
                    src="https://img.icons8.com/sf-black-filled/64/FFFFFF/circled-chevron-down.png"
                    alt="sort-down"
                  />
                </Nav.Link>
              </OverlayTrigger>

              <Nav.Link>Return & Orders</Nav.Link>

              <Nav.Link href="/cart">
                <Image
                  width="30"
                  src="https://img.icons8.com/dotty/80/FFFFFF/shopping-cart.png"
                  alt="shopping-cart"
                />
                {cart_Array.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cart_Array.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              
              <Nav.Link>
                <User/>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
