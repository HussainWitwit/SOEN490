import React, { useEffect, useState } from 'react';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent/BreadcrumbsComponent'
import { mapDispatchToProps } from '../../redux/RightPanelReducer/reducer-actions'
import { connect } from 'react-redux';
import './TopBar.css';

function TopBar({ openAssetTreeview }) {

  const [locationDetails, setLocationDetails] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState(null);

  // eslint-disable-next-line
  const getCurrentLocation = async () => {
    let response = await fetch(`https://geolocation-db.com/json/${process.env.REACT_APP_GEOLOCATION_KEY}`);
    let data = await response.json();
    setLocationDetails({ country_code: data.country_code, city: data.city });
  }

  // eslint-disable-next-line
  const getCurrentWeather = async () => {
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=montreal&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`);
    let data = await response.json();
    setWeatherDetails({ temp: data.main.temp, description: data.weather[0].main, icon: data.weather[0].icon });
  }

  /* istanbul ignore next */
  useEffect(() => {
    if (process.env.REACT_APP_GEOLOCATION_KEY && process.env.REACT_APP_WEATHER_KEY) {
      getCurrentLocation();
      getCurrentWeather();
    }
  }, []);

  return (
    <div className="main-container">
      <nav>
        <BreadcrumbsComponent id="breadcrumb" />
        <p id="change-button" className="change-button" onClick={openAssetTreeview}>Change</p>
        <div id="weather-div" className="weather">
          <p>{weatherDetails ? parseInt(weatherDetails.temp) + "°C " + weatherDetails.description : "Waiting for data"}</p>
          <p>{locationDetails ? locationDetails.city : "Waiting for data"} {locationDetails ? " " + locationDetails.country_code : "Waiting for data"}</p>
        </div>
        <img id="img" className="temperature_icon" alt="icon" src={weatherDetails ? "http://openweathermap.org/img/wn/" + weatherDetails.icon + ".png" : "no icon"} />
      </nav>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(TopBar)
