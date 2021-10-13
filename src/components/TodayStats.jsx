import React from 'react';
import styled from 'styled-components';
/* Contexts */
import {useWeatherContext} from '../context/WeatherContext';
/* Icons */
import {MdNavigation} from 'react-icons/md';

export const TodayStats = () => {
   const {weather} = useWeatherContext();
   const {current} = weather;

   return (
      <>
         <section className="content__stats container">
            <h2>Today's Highlights</h2>
            <article className="stats__grid">
               <article className="stat">
                  <span>Wind Status</span>
                  <h3>{current.wind_mph} mph</h3>
                  <div>
                     <MdNavigation className="icon--circle" />
                     <span>{current.wind_dir}</span>
                  </div>
               </article>

               <article className="stat">
                  <span>Humidity</span>
                  <h3>{current.humidity}%</h3>
                  <div className="justify--between">
                     <span>0</span>
                     <span>50</span>
                     <span>100</span>
                  </div>
                  <ProgressBar fillAmount={current.humidity} />
               </article>

               <article className="stat">
                  <span>Visibility</span>
                  <h3>{current.vis_miles} miles</h3>
               </article>

               <article className="stat">
                  <span>Air Pressure</span>
                  <h3>{current.pressure_mb} mb</h3>
               </article>
            </article>
         </section>
      </>
   );
};

const ProgressBar = styled.div`
   position: relative;
   width: 100%;
   height: 5%;
   max-height: 5%;
   border-radius: 5rem; /* 80px */
   background: #E7E7EB;
   &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: ${props => props.fillAmount + '%'};
      height: 100%;
      max-height: 100%;
      border-radius: 5rem; /* 80px */
      background: #FFEC65;
   }

   &::before {
      content: "%";
      position: absolute;
      bottom: -1.5625rem; /* 25px */
      right: 0;
      font-size: 0.75rem; /* 12px */
      font-weight: 700;
      color: $darkGray;
   }
`;