import "../css/SignIn.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_user_Profile, update_user_Profile } from "../redux/thunk/userThunk";
import Header from "../components/Header";

const UpdateUserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user} = useSelector((state) => state.signUp);
  const { error, isUpdate, isLoading } = useSelector((state) => state.updateuserprofile);

  
  useEffect(() => {
    if (user) {
      setName(user.username);
      setEmail(user.email);
      setAvatarPreview(avatarPreview);
    }


    if (isUpdate) {
      console.log(isUpdate)
      dispatch(get_user_Profile());
      navigate("/user_profile");
    }
  }, [dispatch,navigate, error, isUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("username", name);
    formData.set("email", email);
    formData.set("avatar", avatar);

    dispatch(update_user_Profile(formData));
    navigate("/user_profile");
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
    <Header /><br/>
     
      <h2 className="title">Edit your Profile</h2>
      <div className="profile__box">
        <div className="LOGIN_BOX">
          <form
            className="login register Update_BOX"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h2><FaUserCircle className="icon" /> Hi, {user?.username} </h2>
            <label style={{ textAlign: "center", fontWeight: "bold" }}>
              {user.role === "admin" ? "( Admin )" : ""}
            </label>
            <div className="form-group">
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group avatar_div">
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                      style={{ width: "100px" }}
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="assets/userAvatar/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose your profile pic
                  </label>
                </div>
              </div>
            </div>

            <input
              type="submit"
              value="Update"
              disabled={isLoading ? true : false}
            />
          </form>

          <img
            src="https://res.cloudinary.com/hateybazarey/image/upload/v1675327743/image_processing20230201-31279-1a43vmw_swv7ca.gif"
            width="520"
            height="440"
            className="video__Login"
            alt="update profile animation"
            draggable='false'
          />
        </div>
      </div>
    </>
  );
};

export default UpdateUserProfile;

