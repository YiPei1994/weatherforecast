import React from "react";
import { useWeatherContext } from "../Context/WeatherContext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Box,
  Flex,
  Stack,
  Switch,
  Image,
} from "@chakra-ui/react";

function WeatherScreen() {
  const { weatherData, isLoading, toggleState, state } = useWeatherContext();

  if (isLoading) {
    // Return a loading indicator or message
    return <div>Loading...</div>;
  }

  if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
    // Return a message for the case where weatherData is not available or incomplete
    return <div>No weather data available</div>;
  }

  const {
    weather,
    name,
    main: { temp, temp_max, temp_min },
  } = weatherData;

  const celsius = 280 - temp;
  const celsiusMin = 280 - temp_min;
  const celsiusMax = 280 - temp_max;
  return (
    <Card>
      <CardHeader>
        <Flex align="center" justifyContent="space-between">
          <Heading size="md"> {name} </Heading>

          <Stack align="center" direction="row">
            <Text>Toggle {state ? "°C" : "K"} </Text>
            <Switch size="sm" onChange={() => toggleState()} />
          </Stack>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex alignItems="center" justifyContent="space-around">
          <Flex width="30%" justifyContent="space-around" align="center">
            <Image
              src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
            />
            <Text>{weather[0].main}</Text>
          </Flex>
          <Box width="60%">
            <Text marginBottom="2rem">
              Temp: {state ? `${Math.round(celsius)} °C` : `${temp} K`}{" "}
            </Text>
            <Text>
              {" "}
              max: {state ? `${Math.round(celsiusMax)} °C` : `${temp_max} K`} -
              min: {state ? `${Math.round(celsiusMin)} °C` : `${temp_min} K`}
            </Text>
          </Box>
        </Flex>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default WeatherScreen;
