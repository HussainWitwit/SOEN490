import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import NotificationHub from '../../api/notification-hub/NotificationHub';
import './NotificationAlert.css';

export default function NotificationAlert() {
  const notify = () => toast('Wow so easy!');
  const notificationHub = NotificationHub.getInstance();
  const [notificationMessage, setNotificationMesage] = React.useState('');
  React.useEffect(() => {
    hubConnection.on('ReceiveNotification', (message) => {
      toast.info(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
    });
  });
  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
}
