import  React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureLow } from "react-icons/fa6";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import Weather from './components/weather';
import Logo from './OpenWeather-Logo.jpg';







function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')


  // eslint-disable-next-line
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=us&units=metric&appid=b991f74032e8381c612dc62707586a16`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)  
        console.log(response.data)
      })
      setLocation('')
    }
    else {
      console.log(Error)
    }
  }
  
  function sunriseTime  (x) {
    var date = new Date(x*1000)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var formatTime = hours + ':' + minutes.toString().padStart(2,'0');
    return formatTime
}

  return (
    <div className='App'>
      You are running this application in <b>{process.env.NODE_ENV}</b> mode.
      <div className="searchBox">
            <input value={location} onChange={event => setLocation(event.target.value)} onKeyDown={searchLocation} className="searchInput" type="text" name="" placeholder="Find Location"/>
            <button className="searchButton" href="#">
            <i className="material-icons">
            Search
            </i>
            </button>
      </div>
      {data.weather !== undefined && 
          <Weather
            city={data.name}
            country={data.sys.country} 
            icon={data.weather[0].icon}
            description={data.weather[0].description}
            temperature={data.main.temp_max}
          /> 
      
      }
      
     
      <div className='information'>
          {data.name !== undefined &&
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className='bold'><FaTemperatureLow style={{color:"red"}} />{data.main.feels_like.toFixed()}°C</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className='bold'><WiHumidity style={{color:"blue"}} />{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className='bold'><TiWeatherWindyCloudy style={{color:"gray"}} />{data.wind.speed.toFixed()} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
              <div className="sunrise">
                
                {data.sys ? <p className='bold'><WiSunrise style={{ color:"yellow"}} />{sunriseTime(data.sys.sunrise)}</p> : null}
                <p>Sunrise</p>
              </div>
              <div className='info-main'>
                {data.weather[0].main}
              </div>
              <div className="sunset">
                
                {data.sys ? <p className='bold'><WiSunset style={{color:'red'}} /> {sunriseTime(data.sys.sunset)} </p> : null}
                <p>Sunset</p>
              </div>
            </div>
          }
      </div>
      <img className='logo' src={Logo} alt='logo'/>
  </div>
  )
}

export default App;
