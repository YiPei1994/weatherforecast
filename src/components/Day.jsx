import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

function Day({ day }) {
  const {
    weather,
    dt_txt,
    main: { temp },
  } = day;
  const date = dt_txt.slice(5, 10);
  const formatedDate = date.split("-").reverse().join(" ").replace(" ", ".");
  const celsius = 280 - temp;
  return (
    <Flex
      flexDirection="column"
      w="20%"
      height="150px"
      background="transparent"
      gap="2rem"
    >
      <Heading as="h4" size="md">
        Day {formatedDate}
      </Heading>
      <Flex justifyContent="space-around" align="center" flexDirection="column">
        <Image
          src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
        />
        <Text>{weather[0].main}</Text>
      </Flex>
      <Box>{Math.round(celsius)} °C</Box>
    </Flex>
  );
}

export default Day;
