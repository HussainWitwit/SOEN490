import React from 'react';
import NotifyMe from 'react-notification-timeline';
import './NavMenu.css';
import { HiSun } from "react-icons/hi";


function NavMenu(props) {
  const [data, setData] = React.useState(
    [
      {
        "update": "70 new employees are shifted",
        "timestamp": 1596119688264
      },
      {
        "update": "Time to take a Break, TADA!!!",
        "timestamp": 1596119686811
      }
    ])

  function isLast(index) {
    return index === props.crumbs.length - 1;
  }

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          {
            props.crumbs.map((crumb, ci) => {
              const disabled = isLast(ci) ? 'disabled' : '';

              return (
                <li
                  key={ci}
                  className="breadcrumb-item align-items-center"
                >
                  <button className={`btn btn-sm shadow-none ${disabled}`} onClick={() => props.selected(crumb)}>
                    {crumb}
                  </button>
                </li>
              );
            })
          }
        </ol>
        <div className="weather">
          <p>23°C Sunny</p>
          <p>Montreal Qc</p>
        </div>
        <HiSun className="temperature_icon"/>
        <div className="notification_bell">
          <NotifyMe
            data={data}
            storageKey='notific_key'
            notific_key='timestamp'
            notific_value='update'
            heading='Notification Alerts'
            sortedByKey={false}
            showDate={true}
            size={20}
            color="black"
          />
        </div>
      </nav>
    </div>
  );
}

export default NavMenu;
