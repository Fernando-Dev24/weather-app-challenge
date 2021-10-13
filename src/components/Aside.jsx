import React from 'react';
import { fromUnixTime, format } from 'date-fns';
/* Contexts */
import { useWeatherContext } from '../context/WeatherContext';
/* Icons */
import {MdGpsFixed, MdCircle, MdPlace} from 'react-icons/md';

export const Aside = ({setShowSearch, showCelsius}) => {
   /* Context variables */
   const {weather, setWeather} = useWeatherContext();
   const {current, location} = weather;

   /* API variables */
   const API_KEY = process.env.REACT_APP_API_KEY;
   const API_ENDPOINT = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}`;

   /* formateDate function */
   const formatDate = (date) => {
      return format(fromUnixTime(date), "eeeeee, d, MMMM");
   };

   /* handleSuccess */
   const handleSuccess = async ({coords}) => {
      const {latitude:lat, longitude:lng} = coords;
      const response = await fetch(`${API_ENDPOINT}&q=${lat},${lng}&days=3`);
      const { current, location:weatherLocation, forecast } = await response.json();
      if(response.ok) {
         setWeather({
            current: current,
            location: weatherLocation,
            forecast: forecast
         });
      }
   };

   /* getWeatherLocation */
   const getWeatherLocation = () => {
      if(navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(handleSuccess);
      }
   };

   return (
      <>
        <section className="aside">
           <header className="aside__header">
              <button
                  className="btn"
                  onClick={() => setShowSearch(true)}
               >Search for places</button>
              <button
                  className="btn btn--circle"
                  onClick={getWeatherLocation}
               >
                  <MdGpsFixed className="icon" />
               </button>
           </header>

           <article className="weather__state">
              <img
                  src={current.condition.icon}
                  className="weather__state-image"
                  alt="Shower icon for a rainysunny day"
               />
           </article>

           <article className="weather__stats">
              <div className="weather__stats-main">
                 {showCelsius ?
                  <>
                     <h2>{current.temp_c}</h2>
                     <span>°C</span>
                  </>
                  :
                  <>
                     <h2>{current.temp_f}</h2>
                     <span>°F</span>
                  </>
                 }
              </div>
              <span className="weather__stats-state">{current.condition.text}</span>
           </article>

           <footer className="aside__footer">
              <article className="footer__dates">
                 <span>Today</span>
                 <MdCircle className="small-icon" />
                 <span>{formatDate(location.localtime_epoch)}</span>
              </article>
              <span>
                 <MdPlace className="icon" />
                 {location.region}
              </span>
           </footer>
        </section>
      </>
   );
};