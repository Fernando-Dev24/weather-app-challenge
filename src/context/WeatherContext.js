import React, {useState, useEffect, useContext, useCallback} from 'react';

const WeatherContext = React.createContext();
const useWeatherContext = () => useContext(WeatherContext);

const WeatherProvider = ({children}) => {
   /* States */
   const [weather, setWeather] = useState({});
   const [loading, setLoading] = useState(true);
   const API_KEY = process.env.REACT_APP_API_KEY;
   const API_ENDPOINT = `https://api.weatherapi.com/v1`;

   /* success function using useCallback */
   const handleSuccess = useCallback(
      ({coords}) => {
         const {latitude:lat, longitude:lng} = coords;
         fetch(`${API_ENDPOINT}/forecast.json?key=${API_KEY}&q=${lat},${lng}&days=3`)
         .then((response) => response.json())
         .then(({current, location, forecast}) => {
            setWeather({
               current: current,
               forecast: forecast,
               location: location
            });
            setLoading(false);
         });
      }, [API_ENDPOINT, API_KEY]
   );

   /* error function */
   const handleError = () => {
      console.log('ooops, smt went wrong');
   };

   /* API Call */
   useEffect(() => {
      if(navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
      } else {
         alert('Please, enable geolocation on your browser settings');
      }
   }, [handleSuccess]);
   
   return (
      <WeatherContext.Provider value={{weather: weather, setWeather: setWeather}}>
         {!loading && children}
      </WeatherContext.Provider>
   )
};

export {WeatherContext, useWeatherContext, WeatherProvider};