import React, { useEffect } from 'react';
import './TopBar.css';
import NotificationBell from '../Notification/NotificationBell';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

function TopBar(props) {
  const [locationDetails, setLocationDetails] = React.useState(null);
  const [weatherDetails, setWeatherDetails] = React.useState(null);

  const getCurrentLocation = async () => {
    let response = await fetch(`https://geolocation-db.com/json/${process.env.REACT_APP_GEOLOCATION_KEY}`);
    let data = await response.json();
    setLocationDetails({ country_code: data.country_code, city: data.city });
  }

  const getCurrentWeather = async () => {
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=montreal&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`);
    let data = await response.json();
    setWeatherDetails({ temp: data.main.temp, description: data.weather[0].main, icon: data.weather[0].icon });
  }

  useEffect(() => {
    //Uncomment these 2 lines to enable api calls
    //getCurrentLocation(); 
    //getCurrentWeather();
  }, []);

  return (
    <div className="top_bar">
      <nav>
        <Breadcrumb/>
        <div className="weather">
          <p>{weatherDetails ? parseInt(weatherDetails.temp) + "°C " + weatherDetails.description : "Waiting for data"}</p>
          <p>{locationDetails ? locationDetails.city : "Waiting for data"} {locationDetails ? " " + locationDetails.country_code : "Waiting for data"}</p>
        </div>
        <img className="temperature_icon" alt="icon" src={weatherDetails ? "http://openweathermap.org/img/wn/" + weatherDetails.icon + ".png" : "no icon"} />
        <NotificationBell/>
      </nav>
    </div>
  );
}

export default TopBar;
