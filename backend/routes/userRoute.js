import express from 'express';
import {register,login,logoutUser,getUserProfile,updateUserProfile,updateUser} from "../controller/userController.js";
import {protect} from "../controller/userController.js"

const router = express.Router();

router.route("/signup").post(register);
router.route("/signin").post(login);
router.route("/logout").post(logoutUser);
router.route("/getUserProfile").get(protect,getUserProfile)
router.route("/profile/update").put(protect,updateUserProfile);
router.route("/update/:id").put(protect,updateUser);

export default router;