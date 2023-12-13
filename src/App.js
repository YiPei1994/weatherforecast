import { WeatherContextProvider } from "./Context/WeatherContext";
import WeatherApp from "./components/WeatherApp";
import * as React from "react";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider>
      <WeatherContextProvider>
        <WeatherApp />
      </WeatherContextProvider>
    </ChakraProvider>
  );
}

export default App;
