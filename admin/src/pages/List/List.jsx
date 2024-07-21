import React, { useEffect } from 'react';
import './List.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
        setLoading(false);
      } else {
        console.error('Failed to fetch meals:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove/${itemId}`);
      if (response.data.success) {
        await fetchList();
        toast.success(response.data.msg);
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error('Error :', error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    return <div className="loading">Loading ...</div>;
  } else
    return (
      <div className="list add flex-col">
        <p>All Foods List </p>
        <div className="list-table">
          <div className="list-table-format title">
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Action</p>
          </div>
          {list.map((item, index) => {
            return (
              <div className="list-table-format" key={index}>
                <img src={`${url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p className="cursor" onClick={() => removeItem(item._id)}>
                  X
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
};

export { List };
