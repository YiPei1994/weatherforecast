import React from "react";
import SearchBar from "./SearchBar";
import WeatherScreen from "./WeatherScreen";
import { Box, Container, Heading } from "@chakra-ui/react";

function WeatherApp() {
  return (
    <Box
      w="100%"
      h="100vh"
      bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
      textAlign="center"
    >
      <Heading padding="5rem 0">Find weather infor of your city</Heading>
      <Container>
        <SearchBar />
        <WeatherScreen />
      </Container>
    </Box>
  );
}

export default WeatherApp;
