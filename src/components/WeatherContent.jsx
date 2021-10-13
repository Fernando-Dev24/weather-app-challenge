import React from 'react';
/* Components */
import { WeatherDays } from './WeatherDays';
import {TodayStats} from './TodayStats';

export const WeatherContent = ({setShowCelsius, showCelsius}) => {
   /* handleStateButtons */
   const handleStateButtons = ({target}) => {
      const button1 = document.getElementById('button1');
      const button2 = document.getElementById('button2');
      if(target.id === 'button1') {
         button1.attributes[0].value = 'btn active';
         button2.attributes[0].value = 'btn';
         setShowCelsius(true)
      } else {
         button2.attributes[0].value = 'btn active';
         button1.attributes[0].value = 'btn';
         setShowCelsius(false);
      }
   };

   return (
      <>
         <section className="content">
            <header className="content__header container">
               <button
                  className="btn active"
                  id="button1"
                  onClick={handleStateButtons}
               >°C</button>
               <button
                  className="btn"
                  id="button2"
                  onClick={handleStateButtons}
               >°F</button>
            </header>

            <WeatherDays showCelsius={showCelsius} />
            <TodayStats />
         </section>
      </>
   );
};
