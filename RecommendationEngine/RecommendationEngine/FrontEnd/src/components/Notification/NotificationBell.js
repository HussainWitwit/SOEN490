import React from 'react';
import './NotificationBell.css';
import Notifications from "react-notifications-menu";


function NotificationBell (props) {
    const [notification, setNotifications] = React.useState(
        [
            {
                image: "https://cdn.iconscout.com/icon/free/png-256/avatar-367-456319.png",
                message: '70 new employees are shifted',
                detailPage: '/',
                receivedTime: '12h ago'
            },
            {
                image: "https://cdn.iconscout.com/icon/free/png-256/avatar-367-456319.png",
                message: 'Time to take a Break, TADA!!!',
                detailPage: '/',
                receivedTime: '12h ago'
            }
        ])

    return (
        <div id="main-container" className="notification_bell">
            <Notifications
                data={notification}
                height='260px'
                width='300px'
                cardOption={notification => console.log(notification)}
                viewAllbtn={{ text: 'see all' }}
                markAsRead={notification => console.log(notification)}
                headerBackgroundColor='white'
                header={
                    {
                        title: 'Notifications',
                        option: { text: 'View All', onClick: () => { } }
                    }
                }
            />
        </div>
    );
}

export default NotificationBell;