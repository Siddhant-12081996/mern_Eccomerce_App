import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import {
  generateToken,
  authTokenVerification,
} from "../utils/generateToken.js";
import  cloudinary  from "cloudinary";

// Register Api:

const register = asyncHandler(async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const {username,mobile,email,password} = req.body;
   const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User is already exist");
  }

  const user = await User.create({
    username,
    mobile,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  // console.log(user)
  if (user) {
      res.status(201).json({
        status: "Successful Sign Up!",
        user
      });
    } else {
      res.status(400);
      throw new Error("Invalid user Data");
    }
});

//login
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "Please provide email and password",
    });
  }

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.status(201).json({
      status: "Successful login!",
      token,
    });
  } else {
    res.status(401).json({
      status: "Incorrect credentials",
    });
  }
});

//protected route

const protect = asyncHandler(async (req, res, next) => {
  let token = "";
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({
      status: "Not authorized",
    });
    throw new Error("Not authorized", 401); //401 means not authorised
  }
  const payload = await authTokenVerification(token);

  const userInfo = await User.findById(payload.id);

  if (!userInfo) {
    throw new Error("The user does not exist", 401);
  }
  req.user = userInfo;
  next();
});

// User must be an admin
// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401).send({ message: 'Invalid Admin Token' });
//   }
// };

//logout user
const logoutUser = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
});

res.status(200).json({
    success: true,
    message: "Logged Out",
});
  };

  //get user profile
  const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        mobile:user.mobile,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  })

  //update User Profile 
  const updateUserProfile = asyncHandler(async (req, res) => {
    const newUserData = {
      username: req.body.username,
      email: req.body.email,
    };

    // Update avatar
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const image_id = user.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User profile update successfully",
  });
  });
  
  //update user
  const updateUser = asyncHandler(async (req, res, next) => {
    const newUserData = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
    };
  
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });
  
  
export { register, login, protect,logoutUser,getUserProfile,updateUserProfile,updateUser};
