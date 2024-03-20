import { useEffect } from "react";
import { Link } from "react-router-dom";
 import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import '../css/UserOrder.css';
import { user_all_order } from "../redux/thunk/orderThunk";
import Loader from "../components/Loader";
import Header from "../components/Header";

const UserOrder = () => {
  const dispatch = useDispatch();

  const { isLoading, error, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(user_all_order());
  }, [dispatch]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/user/order/details/${order._id}`} className="btn btn-primary" style={{background: '#3bd975'}}>
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <>
     <Header/>

      <h1 className="my-5 section__p1">My Orders</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-3 section__p1 per__order"
          bordered
          striped
          hover
        />
      )}
    </>
  );
};

export default UserOrder;
