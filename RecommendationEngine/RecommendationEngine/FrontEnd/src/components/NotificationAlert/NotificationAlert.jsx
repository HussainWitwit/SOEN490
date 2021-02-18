import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import NotificationHub from '../../api/notification-hub/NotificationHub';
import 'react-toastify/dist/ReactToastify.css';
import './NotificationAlert.css';

export default function NotificationAlert() {
  const notify = () => toast('Wow so easy!');
  const notificationHub = NotificationHub.getHubConnection();
  const handleNotification = (message) => toast.info(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    });
  React.useEffect(() => {
    notificationHub.on('ReceiveNotification', (message) => {
      handleNotification(message);
    });
  }, [notificationHub.on('ReceiveNotification')]);
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
