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
} from "@chakra-ui/react";

function WeatherScreen() {
  const { weatherData, isLoading, toggleState, state } = useWeatherContext();

  console.log(weatherData);
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

  const celsius = ((temp - 32) * 5) / 9;
  const celsiusMin = ((temp_min - 32) * 5) / 9;
  const celsiusMax = ((temp_max - 32) * 5) / 9;
  return (
    <Card>
      <CardHeader>
        <Flex align="center" justifyContent="space-between">
          <Heading size="md"> {name} </Heading>
          <Stack align="center" direction="row">
            <Text>Toggle {state ? "°C" : "°F"} </Text>
            <Switch size="sm" onChange={() => toggleState()} />
          </Stack>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex alignItems="center">
          <Box width="30%">
            {weather[0].icon}
            <Text>{weather[0].main}</Text>
          </Box>
          <Box width="60%">
            <Text>Temp: {state ? celsius : temp} </Text>
            <Text>
              {" "}
              max: {state ? celsiusMax : temp_max} - min:{" "}
              {state ? celsiusMin : temp_min}
            </Text>
          </Box>
        </Flex>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default WeatherScreen;
