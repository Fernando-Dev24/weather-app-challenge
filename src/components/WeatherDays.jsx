import React from 'react';
import { format } from 'date-fns';
/* Contexts */
import { useWeatherContext } from '../context/WeatherContext';

export const WeatherDays = ({showCelsius}) => {
   const {weather} = useWeatherContext();
   const {forecast} = weather;

   /* Format date function */
   const formatDate = (date) => {
      const dateParsed = new Date(date.replace(/-/g, '/'));
      return format(dateParsed, "eeeeee, d, MMMM");
   };
   
   return (
      <>
         <section className="content__days container">
            <article className="day">
               <span>{formatDate(forecast.forecastday[1].date)}</span>
               <img
                  src={forecast.forecastday[1].day.condition.icon}
                  alt="Sleet icon for rainy snow days"
               />
               <div className="day__stats">
                  {showCelsius ?
                     <>
                        <span>Max Temp: {forecast.forecastday[1].day.maxtemp_c}°C</span>
                        <span>Min Temp {forecast.forecastday[1].day.mintemp_c}°C</span>
                     </>
                     :
                     <>
                        <span>Max Temp: {forecast.forecastday[1].day.maxtemp_f}°F</span>
                        <span>Min Temp {forecast.forecastday[1].day.mintemp_f}°F</span>
                     </>
                  }
               </div>
            </article>

            <article className="day">
               <span>{formatDate(forecast.forecastday[2].date)}</span>
               <img
                  src={forecast.forecastday[2].day.condition.icon}
                  alt="Sleet icon for rainy snow days"
               />
               <div className="day__stats">
                  {showCelsius ?
                     <>
                        <span>Max Temp: {forecast.forecastday[2].day.maxtemp_c}°C</span>
                        <span>Min Temp {forecast.forecastday[2].day.mintemp_c}°C</span>
                     </>
                     :
                     <>
                        <span>Max Temp: {forecast.forecastday[2].day.maxtemp_f}°F</span>
                        <span>Min Temp {forecast.forecastday[2].day.mintemp_f}°F</span>
                     </>
                  }
               </div>
            </article>
         </section>
      </>
   )
}
