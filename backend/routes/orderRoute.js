import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  listOrders,
  placeOrder,
  updateOrderStatus,
  userOrders,
  verifyOrder,
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/userOrders', authMiddleware, userOrders);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/status', updateOrderStatus);
orderRouter.get('/list', listOrders);

export { orderRouter };
