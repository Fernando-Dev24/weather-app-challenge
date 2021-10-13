import React, {useState} from 'react';
import WebFont from 'webfontloader';
import { Helmet } from 'react-helmet';
/* Components */
import { Aside } from './components/Aside';
import { Search } from './components/Search';
import { WeatherContent } from './components/WeatherContent';
/* Sources */
import favicon from './images/favicon.png';

export const WeatherApp = () => {
   const [showSearch, setShowSearch] = useState(false);
   const [showCelsius, setShowCelsius] = useState(true);

   WebFont.load({
      google: {
         families: ['Raleway:100,500,600,700', 'sans-serif']
      }
   });

   return (
      <>
         <Helmet>
            <link rel="shortcut icon" href={favicon} type="image/x-icon" />
         </Helmet>

         <main className="wrapper">
            {showSearch ?
               <Search setShowSearch={setShowSearch} />
               :
               <Aside
                  setShowSearch={setShowSearch}
                  showCelsius={showCelsius}
               />
            }
            <WeatherContent
               showCelsius={showCelsius}
               setShowCelsius={setShowCelsius}
            />
         </main>
      </>
   );
};