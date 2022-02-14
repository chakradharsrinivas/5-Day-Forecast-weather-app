import './App.css';
import moment from 'moment';
import React, {useState} from 'react';
function App() {
  const api = {
    key: "32ba0bfed592484379e51106cef3f204",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=27433119ebe55f4a22d4d9753b1016f6`)
      .then(es => es.json())
        .then(esult => {
          setWeather(esult);
          setQuery('');
          console.log(esult);
        });
    }
  }
  const gettdate=(d,k)=> {
    let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    let a=d.getDay()+k
    if(a>=7)
    a=a%7
    let day = days[a];
    return `${day}`
  }
 const fetchlocation=()=>{
  navigator.geolocation.getCurrentPosition((success) => {      
    let {latitude, longitude } = success.coords;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=27433119ebe55f4a22d4d9753b1016f6`)
    .then(res => res.json())
    .then(data => {
    console.log(data)
    setWeather(data);
    })

})

  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  setInterval = () => {
    let time = new Date();
    let hour = time.getHours();
    let hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    let minutes = time.getMinutes();
    let ampm = hour >=12 ? 'PM' : 'AM'
    
    return `${hoursIn12HrFormat}:${minutes} ${ampm}`
  }

  return (
<div>
<div class={(typeof weather.main != "undefined") ? ((weather.list[0].main.temp > 2) ? 'container warm' : 'epage') : 'container'}>
    <div class="current-info">

        <div class="date-container">
            <div class="time" id="time">
            { setInterval() }
            </div>
            <div class="date" id="date">
            { dateBuilder(new Date()) }
            </div>

            <div class="others" id="current-weather-items">
            {(typeof weather.city != "undefined") ? (
        <div>
<div class="weather-item">
<div>
<div>Humidity - {weather.list[0].main.humidity}%</div>
<div>Maximum Temperature - {weather.list[0].main.temp_max}°c</div>
<div>Minimum Temperature - {weather.list[0].main.temp_min}°c</div>
<div>Pressure - {weather.list[0].main.pressure} Pascals</div>
<div>Wind Speed -  {weather.list[0].wind.speed} anemometer
</div>
<div>Sunrise - {moment(weather.city.sunrise * 1000).format('HH:mm ')}hrs Sunset - {moment(weather.city.sunset * 1000).format('HH:mm ')}hrs</div>
</div>

</div>
</div>) : ('')}                      
            </div>
        </div>
        <button class="btn" id="fetchloc" onClick={() =>fetchlocation()}>Fetch my location</button>

        {(typeof weather.city != "undefined") ? (
<div>
<div class="place-container">
                <div class="time-zone" id="time-zone">{weather.city.name}</div>
                <div id="country" class="country">{weather.city.coord.lat} , {weather.city.coord.lon}</div>
            </div>
</div>) : ('')}


<div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

    </div>    

</div>
{(typeof weather.city != "undefined") ? (
<div class="future-forecast">
    <div class="today" id="current-temp">
        <div class="other">          
        <img src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@4x.png`} alt="weather icon" class="w-icon"id="icon"/>
            <div class="day">{ gettdate(new Date(),0)}</div>
            <div class="temp">Max Temp - {weather.list[0].main.temp_max}°c</div>
            <div class="temp">Min Temp - {weather.list[0].main.temp_max}°c</div>
            <div class="temp"> sky - {weather.list[0].weather[0].description}</div>
        </div>
    </div>
    <div class="weather-forecast" id="weather-forecast">
        <div class="weather-forecast-item">
            <div class="day">{ gettdate(new Date(),1)}</div>
            <img src={`http://openweathermap.org/img/wn/${weather.list[1].weather[0].icon}@2x.png`} alt="weather icon" class="w-icon" />
            <div class="temp">Max Temp - {weather.list[1].main.temp_max}°c</div>
            <div class="temp">Min Temp - {weather.list[1].main.temp_max}°c</div>
            <div class="temp"> sky - {weather.list[1].weather[0].description}</div>
        </div>
    </div>
    <div class="weather-forecast" id="weather-forecast">
        <div class="weather-forecast-item">
            <div class="day">{ gettdate(new Date(),2)}</div>
            <img src={`http://openweathermap.org/img/wn/${weather.list[2].weather[0].icon}@2x.png`} alt="weather icon" class="w-icon"/>
            <div class="temp">Max Temp - {weather.list[2].main.temp_max}°c</div>
            <div class="temp">Min Temp - {weather.list[2].main.temp_max}°c</div>
            <div class="temp"> sky - {weather.list[2].weather[0].description}</div>
        </div>
    </div>
    <div class="weather-forecast" id="weather-forecast">
        <div class="weather-forecast-item">
            <div class="day">{ gettdate(new Date(),3)}</div>
            <img src={`http://openweathermap.org/img/wn/${weather.list[3].weather[0].icon}@2x.png`} alt="weather icon" class="w-icon"/>
            <div class="temp">Max Temp - {weather.list[3].main.temp_max}°c</div>
            <div class="temp">Min Temp - {weather.list[3].main.temp_max}°c</div>
            <div class="temp"> sky - {weather.list[3].weather[0].description}</div>
        </div>
    </div>
    <div class="weather-forecast" id="weather-forecast">
        <div class="weather-forecast-item">
            <div class="day">{ gettdate(new Date(),4)}</div>
            <img src={`http://openweathermap.org/img/wn/${weather.list[4].weather[0].icon}@2x.png`} alt="weather icon" class="w-icon"/>
            <div class="temp">Max Temp - {weather.list[4].main.temp_max}°c</div>
            <div class="temp">Min Temp - {weather.list[4].main.temp_max}°c</div>
            <div class="temp"> sky - {weather.list[4].weather[0].description}</div>
        </div>
    </div>
    <div class="weather-forecast" id="weather-forecast">
        <div class="weather-forecast-item">
            <div class="day">{ gettdate(new Date(),5)}</div>
            <img src={`http://openweathermap.org/img/wn/${weather.list[5].weather[0].icon}@2x.png`} alt="weather icon" class="w-icon"/>
            <div class="temp">Max Temp - {weather.list[5].main.temp_max}°c</div>
            <div class="temp">Min Temp - {weather.list[5].main.temp_max}°c</div>
            <div class="temp"> sky - {weather.list[5].weather[0].description}</div>
        </div>
    </div>
    <div class="weather-forecast" id="weather-forecast">
        <div class="weather-forecast-item">
            <div class="day">{ gettdate(new Date(),6)}</div>
            <img src={`http://openweathermap.org/img/wn/${weather.list[6].weather[0].icon}@2x.png`} alt="weather icon" class="w-icon"/>
            <div class="temp">Max Temp - {weather.list[6].main.temp_max}°c</div>
            <div class="temp">Min Temp - {weather.list[6].main.temp_max}°c</div>
            <div class="temp"> sky - {weather.list[6].weather[0].description}</div>
        </div>
    </div>

</div>
) :('')}
</div>
 );
}
export default App;
