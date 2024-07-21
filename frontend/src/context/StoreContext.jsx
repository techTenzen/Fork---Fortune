import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = 'http://localhost:4000';
  const [food_list, setFood_list] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [notification, setNotification] = useState(null);

  const addToCart = async (itemId) => {
    if (token) {
      try {
        await axios.post(
          url + '/api/cart/add',
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        await fetchCartItems(token);
        setNotification({ type: 'success', message: 'Item added to cart!' });
      } catch (error) {
        setNotification({
          type: 'error',
          message: 'Failed to add item to cart.',
        });
      }
    } else {
      setNotification({
        type: 'error',
        message: 'To add this item to your cart, please sign in first.',
      });
      scrollTo(0, 0);
      setShowLogin(true);
    }
  };

  const removeFromCart = async (itemId) => {
    if (token) {
      try {
        await axios.post(
          url + '/api/cart/remove',
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        await fetchCartItems(token);
        setNotification({
          type: 'success',
          message: 'Item removed from cart!',
        });
      } catch (error) {
        setNotification({
          type: 'error',
          message: 'Failed to remove item from cart.',
        });
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.status === 200 && response.data.success) {
        setFood_list(response.data.data); 
      } else {
        console.error('Failed to fetch food list:', response.data.msg);
      }
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  };

  const fetchCartItems = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 && response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        console.error('Failed to fetch cart items:', response.data.msg);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        await fetchCartItems(localStorage.getItem('token'));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    url,
    token,
    showLogin,
    notification,
    setNotification,
    setShowLogin,
    setToken,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    fetchCartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
