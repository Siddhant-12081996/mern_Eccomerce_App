import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  getOrders,
} from '../controller/orderController.js';
import { protect} from '../controller/userController.js';

router.route('/').post(protect, addOrderItems).get(protect,getOrders);
router.route('/user').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/deliver').put(protect,updateOrderToDelivered);

export default router;
