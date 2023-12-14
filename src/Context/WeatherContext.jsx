import { createContext, useContext, useEffect, useState } from "react";

const WeatherContext = createContext();

const API_KEY = "1944aa264909b744c4c068b7dff6c706";

const API_GEO = "http://api.openweathermap.org/geo/1.0/direct?";

const API_WEATHER = "https://api.openweathermap.org/data/2.5/weather";

const API_FORECAST = "https://api.openweathermap.org/data/2.5/forecast";
function WeatherContextProvider({ children }) {
  const [searchedCity, setSearchedCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [state, setState] = useState(true);
  const [fiveDays, setFiveDays] = useState([]);

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setIsLoading(true);
          if (!searchedCity) return;
          const response = await fetch(
            `${API_GEO}q=${searchedCity}&limit=1&appid=${API_KEY}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          if (!data) return;
          setLat(data[0].lat);
          setLon(data[0].lon);
          return data;
        } catch (error) {
          console.error("Error fetching data:", error.message);
          throw error;
        } finally {
          setIsLoading(false);
        }
      }
      fetchCityData();
    },
    [searchedCity]
  );

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        setIsLoading(true);

        if (isNaN(lat) || isNaN(lon)) {
          throw new Error("Invalid latitude or longitude");
        }

        const response = await fetch(
          `${API_WEATHER}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeatherData();
  }, [lat, lon]);

  useEffect(() => {
    async function fetchWeatherForecast() {
      try {
        setIsLoading(true);

        if (isNaN(lat) || isNaN(lon)) {
          throw new Error("Invalid latitude or longitude");
        }

        const response = await fetch(
          `${API_FORECAST}?lat=${lat}&lon=${lon}&cnt=40&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFiveDays(data.list);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeatherForecast();
  }, [lat, lon]);

  function handleSearch(city) {
    if (!city) return;
    setSearchedCity(city);
  }
  function toggleState() {
    setState((s) => !s);
  }
  return (
    <WeatherContext.Provider
      value={{
        handleSearch,
        weatherData,
        isLoading,
        toggleState,
        state,
        fiveDays,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

function useWeatherContext() {
  const context = useContext(WeatherContext);
  if (context === undefined)
    throw new Error(
      "WeatherContext was used outside of WeatherContextProvider"
    );

  return context;
}

export { WeatherContextProvider, useWeatherContext };
