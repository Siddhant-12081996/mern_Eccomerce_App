import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../css/UserOrder.css";
import { get_user_order_details } from "../redux/thunk/orderThunk";
import Loader from "../components/Loader";
const UserOrderDetails = () => {
    const match = useParams();
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    orders_details = {},
  } = useSelector((state) => state.order);
  const {
    shippingAddress,
    orderItems,
    paymentResult,
    user,
    totalPrice,
    orderStatus,
  } = orders_details;

  useEffect(() => {
    dispatch(get_user_order_details(match.id));
  }, [dispatch,match.id]);

  const shippingDetails =
  shippingAddress &&
    `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`;

  const isPaid =
  paymentResult && paymentResult.status === "succeeded" ? true : false;
  const parchaseDate = String(orders_details.paidAt).substring(0, 10);
  return (
    <>
        {isLoading ? (
        <Loader />
      ) : (
        <div className="order__details__container">
          <div
            style={{
              padding: "20px",
              color: "#000",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '25px'
            }}
          >
            Order Id # {orders_details._id}
          </div>
          <div className="d-flex justify-content-between">
            <div className="shipping__info_order__details">
              <h4 className="mb-4">Shipping Info</h4>
            <div style={{marginLeft: '20px'}}>
              <p>
                <b>Name:</b> {user && user.username}
              </p>
              <p>
                <b>Phone No:</b> {shippingAddress && shippingAddress.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address: </b>
                {shippingDetails}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>
              </div>
            </div>
            <div className="order__details_status">
              <div className="order__details_payment">
                <h4 className="my-4">Payment</h4>
                <p className={isPaid ? "greenColor" : "redColor"}>
                  <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                </p>
              </div>
              <div className="order__details_status_sec">
                <h4 className="my-4">Order Status</h4>
                <p
                  className={
                    orders_details.orderStatus &&
                    String(orders_details.orderStatus).includes("Delivered")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{orderStatus}</b>
                </p>
              </div>
            </div>
          </div>
          
          
          <h4 style={{marginLeft: '20px'}}>Order Purchase Date : {parchaseDate}</h4>
        
        <hr />

          <h4 style={{marginLeft: '20px'}}>Order Items</h4>    
          <div className="cart__item_order__details" style={{marginLeft: '20px'}}>
            {orderItems &&
              orderItems.map((item) => (
                <div key={item.product} className="row my-5">
                  <div className="col-4 col-lg-2">
                  <Link to={`/product/${item.product}`} style={{color: '#000', textDecoration: 'none'    }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      height="45"
                      width="65"
                    />
                    </Link>
                  </div>

                  <div className="col-5 col-lg-5">
                    <Link to={`/product/${item.product}`} style={{color: '#000', textDecoration: 'none'    }}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p>${item.price}</p>
                  </div>

                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <p>{item.qty} Piece(s)</p>
                  </div>
                </div>
              ))}
          </div>
          <hr />
        </div>
      )}

    </>
  )
}

export default UserOrderDetails