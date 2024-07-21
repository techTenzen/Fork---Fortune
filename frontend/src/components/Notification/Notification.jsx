import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Notification.css'; // Add some basic styles for notification

const Notification = () => {
  const { notification, setNotification } = useContext(StoreContext);

  if (!notification) return null;

  setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
};

export default Notification;
