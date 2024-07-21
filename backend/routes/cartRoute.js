import express from 'express';
import {
  addToCart,
  removeFromCart,
  getUserCartItems,
} from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, addToCart);
cartRouter.post('/remove', authMiddleware, removeFromCart);
cartRouter.post('/list', authMiddleware, getUserCartItems);

export { cartRouter };
