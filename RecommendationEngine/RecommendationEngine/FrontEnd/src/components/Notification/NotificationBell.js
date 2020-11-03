import React from 'react';
import NotifyMe from 'react-notification-timeline';
import './NotificationBell.css';

function NotificationBell(props) {
        const [notification, setNotifications] = React.useState([
                {
                        update: '70 new employees are shifted',
                        timestamp: 1596119688264,
                },
                {
                        update: 'Time to take a Break, TADA!!!',
                        timestamp: 1596119686811,
                },
        ]);
        return (
                <div className="notification_bell">
                        <NotifyMe
                                data={notification}
                                storageKey="notific_key"
                                notific_key="timestamp"
                                notific_value="update"
                                heading="Notification Alerts"
                                sortedByKey={false}
                                showDate={true}
                                size={20}
                                color="black"
                        />
                </div>
        );
}

export default NotificationBell;
