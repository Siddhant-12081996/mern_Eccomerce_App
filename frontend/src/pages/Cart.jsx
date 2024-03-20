import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import { FaTrash } from 'react-icons/fa';
import { items_Add_To_Cart, items_Remove_To_Cart } from '../redux/slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/esm/Image';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card';
import Header from "../components/Header"
import Container from 'react-bootstrap/Container';
import { useState } from 'react';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {cart_Array} = useSelector((state) => state.cart);
  const {signIn} = useSelector((state)=>state.signIn)
console.log(cart_Array)
  // NOTE: no need for an async function here as we are not awaiting the
  // resolution of a Promise
  const addToCartHandler = (product, qty) => {
    dispatch(items_Add_To_Cart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(items_Remove_To_Cart(id));
    
  };

  const checkoutHandler = () => {
     navigate('/signin?redirect=shipping');
  };

  return (
    <>
    <Header/>
   
    <Container>
    <Header/><br/><br/><br/><br/>
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cart_Array.length === 0 ? (
          <Alert variant="primary">
            Your cart is empty <Link to='/'>Go Back</Link>
          </Alert>
        ) : (
          <ListGroup variant='flush'>
            {cart_Array.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>₹{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(Math.min(50,item.countInStock)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cart_Array.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ₹
              {cart_Array
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cart_Array.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    </Container>
    </>
  );
};

export default Cart;
