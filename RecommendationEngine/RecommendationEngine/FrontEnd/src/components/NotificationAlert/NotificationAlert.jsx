import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import NotificationHub from '../../api/notification-hub/NotificationHub';
import 'react-toastify/dist/ReactToastify.css';
import './NotificationAlert.css';
import { Error, Info } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

function NotificationIcon ({ type }) {
  switch (type) {
    case "Information":
      return <Info />;
    case "Error":
      return <Error />;
    default:
      return;
  }
}

function NotificationContent ({ message, type }) {
  return (
    <Grid container>
      <Grid container item xs={2}>
        <NotificationIcon type={type} />
      </Grid>
      <Grid container item xs={10}>{message}</Grid>
    </Grid>
  );
}

export default function NotificationAlert () {
  const notificationHub = NotificationHub.getHubConnection();

  const toastrSettings = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  };
  const handleNotification = (notification) => {
    if (notification.type === "Information")
      toast.info(<NotificationContent type={notification.type} message={notification.message} />, toastrSettings);
    else if (notification.type === "Error")
      toast.error(<NotificationContent type={notification.type} message={notification.message} />, toastrSettings);
  }

  useEffect(() => {
    notificationHub.on('ReceiveNotification', (notification) => {
      handleNotification(notification);
    });
  }, [notificationHub.on('ReceiveNotification')]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

/* istanbul ignore next */
NotificationContent.propTypes = {
  messgae: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
