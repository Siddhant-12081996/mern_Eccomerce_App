import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../css/User.css";
import { IoSettingsOutline } from 'react-icons/io5'
import { BsBagCheck } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import { userLogout } from "../redux/thunk/userThunk";

const User = () => {
  let loginUser = false;
  const [profileOpen, setProfileOpen] = useState(false);

  const close = () => {
    setProfileOpen(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.signUp);
  

  console.log(user)
  if (user) {
    loginUser = true;
  }
  const handleLogout = () => {
    try {
      dispatch(userLogout());
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="profile">
        {loginUser ? (
          <>
            <button
              className="img"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img
                src={user.avatar && user.avatar.url}
                alt={user && user.username}
              />
            </button>

            {profileOpen && (
              <div className="openProfile boxItems" onClick={close}>
                <div className="image">
                  <Link to="/user_profile">
                    <div className="img">
                      <img
                        src={user.avatar && user.avatar.url}
                        alt={user && user.username}
                      />
                    </div>
                  </Link>
                  <div className="text">
                    <h4>{user.username}</h4>
                    <label>
                      {user && user.role === "admin"
                        ? "Admin"
                        : "Royel Customer"}
                    </label>
                  </div>
                </div>
                <Link to="/user_profile">
                  <button className="box">
                    <IoSettingsOutline className="icon" />
                    <h4>My Account</h4>
                  </button>
                </Link>

                {user && user.role !== "admin" ? (
                  <Link to="/user/order">
                    <button className="box">
                      <BsBagCheck className="icon" />
                      <h4>My Order</h4>
                    </button>
                  </Link>
                ) : (
                  <Link to="/">
                    <button className="box">
                      <RxDashboard className="icon" />
                      <h4>Dashboard</h4>
                    </button>
                  </Link>
                )}
                <Link>
                  <button className="box" onClick={handleLogout}>
                    <BiLogOut className="icon" />
                    <h4>Log Out</h4>
                  </button>
                </Link>
              </div>
            )}
          </>
        ) : (
          !isLoading && (
            <Link
              to="/signin"
              style={{
                color: "green",
                fontWeight: "bold",
                marginRight: "15px",
              }}
            >
              My Account
            </Link>
          )
        )}
      </div>
    </>
  );
};

export default User;
