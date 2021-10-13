import React from 'react';
import ReactDOM from 'react-dom';
/* Contexts */
import { WeatherProvider } from './context/WeatherContext';
/* Components */
import { WeatherApp } from './WeatherApp';
/* Sources */
import './scss/index.scss';

ReactDOM.render(
   <WeatherProvider>
      <WeatherApp />
   </WeatherProvider>,
   document.getElementById('root')
);