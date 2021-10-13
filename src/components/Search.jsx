import React, {useState} from 'react';
/* Context */
import {useWeatherContext} from '../context/WeatherContext';
/* Elements */
import Alert from '../elements/Alert';
/* Icons */
import { MdChevronRight, MdClose } from 'react-icons/md';

export const Search = ({setShowSearch}) => {
   /* Getting context */
   const {setWeather} = useWeatherContext();
   
   /* States */
   const [location, setLocation] = useState('');
   const [alertState, setAlertState] = useState(false);
   const [alertContent, setAlertContent] = useState({});
   
   /* Forms variables */
   const citiesRegEx = /^[a-zA-Z\u0080-\u024F]+(?:([-']|(.))[a-zA-Z\u0080-\u024F]+)*$/;
   const API_KEY = process.env.REACT_APP_API_KEY;
   const API_ENDPOINT = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}`;

   /* handleState */
   const handleState = (e) => setLocation(e.target.children[0].innerText);

   /* handleSubmit */
   const handleSubmit = async (e) => {
      e.preventDefault();
      setAlertContent({})
      setAlertState(false);

      /* Validations */
      if(location === '') {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Please, enter a city name'
         });
         return;
      }

      if(!citiesRegEx.test(location)) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Please, enter a valid city name'
         });
         return;
      }

      try {
         const response = await fetch(`${API_ENDPOINT}&q=${encodeURI(location)}&days=3`)
         const { current, location:weatherLocation, forecast } = await response.json();
         if(response.ok) {
            setWeather({
               current: current,
               location: weatherLocation,
               forecast: forecast
            });
            setShowSearch(false);
         } else {
            setAlertState(true);
            setAlertContent({
               type: 'error',
               message: 'Something went wrong, please try again or refresh the webpage'
            })
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <aside className="search">
            <form
               className="search__form container"
               autoComplete="off"
               onSubmit={handleSubmit}
            >
               <input
                  type="text"
                  name="city"
                  className="material-icons"
                  placeholder="Search Location"
                  value={location}
                  onChange={({target}) => setLocation(target.value)}
               />
               <button className="btn btn--primary">Search</button>
            </form>

            <article className="default__search">
               <div className="option" onClick={handleState}>
                  <p>London</p>
                  <span><MdChevronRight /></span>
               </div>
               <div className="option" onClick={handleState}>
                  <p>Barcelona</p>
                  <span><MdChevronRight /></span>
               </div>
               <div className="option" onClick={handleState}>
                  <p>Long Beach</p>
                  <span><MdChevronRight /></span>
               </div>
            </article>

            <MdClose
               className="icon icon--corner"
               onClick={() => setShowSearch(false)}
            />
         </aside>

         <Alert
            type={alertContent.type}
            message={alertContent.message}
            alertState={alertState}
            setAlertState={setAlertState}
         />
      </>
   );
};