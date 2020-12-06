import React from 'react';
import './NotificationBell.css';
import Notifications from "react-notifications-menu";


function NotificationBell () {
    // eslint-disable-next-line
    const [notification] = React.useState(
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
                id="notifications"
                data={notification}
                height='260px'
                width='300px'
                cardOption={cardNotification => console.log(cardNotification)}
                viewAllbtn={{ text: 'see all' }}
                markAsRead={markNotification => console.log(markNotification)}
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