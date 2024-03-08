import React from 'react';
import PropTypes from 'prop-types';
import { FaTemperatureLow } from "react-icons/fa6";
import './weather.css'



const Weather = ({city, country, temperature, description, icon }) => (
    <div className='location'>
        <h1>{city}, {country}</h1>
        <div>
            <img className="weather-icon" src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather icon" />
        </div>
        <div className='description'>
            <FaTemperatureLow style={{color:"red"}} /> {temperature}°C 
        </div>
        <p>{description}</p>
    </div>
);

Weather.propTypes = {
    city:PropTypes.string,
    country: PropTypes.string,
    temperature:PropTypes.number,
    description: PropTypes.string,
    icon: PropTypes.string,
};

export default Weather;