import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, food_list, cartItems, url, token } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let OrderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let foodInfo = item;
        foodInfo['quantity'] = cartItems[item._id];
        OrderItems.push(foodInfo);
      }
    });
    let orderData = {
      address: data,
      items: OrderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(url + '/api/order/place', orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert('Error !!');
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          required
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          value={data.street}
          required
          onChange={onChangeHandler}
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip code"
            name="zipCode"
            value={data.zipCode}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount() ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + (getTotalCartAmount() ? 2 : 0)}</b>
            </div>
            <hr />
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export { PlaceOrder };
