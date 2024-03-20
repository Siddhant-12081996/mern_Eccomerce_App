

import express from "express";
import {checkout,getKey,paymentVerification} from "../controller/paymentController.js"

const router = express.Router();

router.route("/checkout").post(checkout)
router.route("/paymentVerification").post(paymentVerification);
router.route("/api/getkey").get(getKey)
export default router;