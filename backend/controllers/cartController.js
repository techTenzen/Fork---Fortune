import { userModel } from '../models/userModel.js';

// Add to cart
const addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' });
    }
    let cartData = user.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.status(200).json({ success: true, msg: 'Item added to cart' });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: 'Error adding to cart' });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' });
    }

    let cartData = user.cartData;
    if (cartData[req.body.itemId]) {
      if (cartData[req.body.itemId] === 1) {
        delete cartData[req.body.itemId];
      } else {
        cartData[req.body.itemId] -= 1;
      }
    }

    await userModel.updateOne({ _id: req.body.userId }, { cartData: cartData });
    return res
      .status(200)
      .json({ success: true, msg: 'Removed item from cart' });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: 'Error adding to cart' });
  }
};

// Get all User Cart items
const getUserCartItems = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' });
    }

    return res.status(200).json({ success: true, cartData: user.cartData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: 'Error fetching cart items', error });
  }
};

export { addToCart, removeFromCart, getUserCartItems };
