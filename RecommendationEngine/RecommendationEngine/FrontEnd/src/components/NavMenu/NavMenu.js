import React, { useEffect } from 'react';
import NotifyMe from 'react-notification-timeline';
import './NavMenu.css';


function NavMenu(props) {
  const [notification, setNotifications] = React.useState(
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

  const [locationDetails, setLocationDetails] = React.useState(null);
  const [weatherDetails, setWeatherDetails] = React.useState(null);
  const [serverError, setServerError] = React.useState(null);

  const getCurrentLocation = async () => {
    let response;
    let data;
    try {
      response = await fetch(`https://geolocation-db.com/json/${process.env.REACT_APP_GEOLOCATION_KEY}`);
    }
    catch (ex) {
      return setServerError(ex);
    }
    if (!response.ok) {
      return setServerError(response);
    }
    data = await response.json();
    setLocationDetails({ country_code: data.country_code, city: data.city });
  }


  const getCurrentWeather = async () => {
    let response;
    let data;
    try {
      response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=montreal&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`);
    }
    catch (ex) {
      return setServerError(ex);
    }
    if (!response.ok) {
      return setServerError(response);
    }
    data = await response.json();
    setWeatherDetails({ temp: data.main.temp, description: data.weather[0].main, icon: data.weather[0].icon });
  }

  function isLast(index) {
    return index === props.crumbs.length - 1;
  }

  useEffect(() => {
    getCurrentLocation();
    getCurrentWeather();
  }, []);



  return (
    <div>
      <nav>
        {/* <ShowServerError error={serverError}/>  ----> will be place in another component later on*/} 
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
          <p>{weatherDetails ? parseInt(weatherDetails.temp) + "°C " + weatherDetails.description : "Waiting for data"}</p>
          <p>{locationDetails ? locationDetails.city : "Waiting for data"} {locationDetails ? " " + locationDetails.country_code : "Waiting for data"}</p>
        </div>
        <img className="temperature_icon" src={weatherDetails ? "http://openweathermap.org/img/wn/" + weatherDetails.icon + ".png" : "no icon"} />
        <div className="notification_bell">
          <NotifyMe
            data={notification}
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

// if we ever want to send the error to the main page as a pop up, the function is here - C.S.B
function ShowServerError({ error }) {
  if (!error) {
    return null;
  }
  return (
    <div className="alert">
      <h3>Server Error</h3>
      {error instanceof window.Response ? (
        <p>
          <b>{error.status}</b> on <b>{error.url}</b>
          <br />
          <small>{error.statusText}</small>
        </p>
      ) : (
        <p>
          <code>{error.toString()}</code>
        </p>
      )}
    </div>
  );
}

export default NavMenu;
