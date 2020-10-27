import React from 'react';
import styled from 'styled-components';
import NotifyMe from 'react-notification-timeline';
import './NavMenu.css';

const Navigation = styled.nav`
    border-bottom: 1px;
    box-shadow: 0 3px 3px 0px rgba(0,0,0,.2);
    // background-color: yellow;
    height: 35px;
`;

const breadcrumb = {
  backgroundColor: 'white',
}

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
    <Navigation>
      <ol className="breadcrumb" style={breadcrumb}>
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
      <div class="notification_bell">
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
    </Navigation>
  );
}

export default NavMenu;
