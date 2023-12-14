import React from "react";
import { useWeatherContext } from "../Context/WeatherContext";
import Day from "./Day";
import { Flex } from "@chakra-ui/react";

function FiveDays() {
  const { fiveDays } = useWeatherContext();
  if (!fiveDays) return;
  const days = Object.entries(fiveDays);
  let filteredDays = [];
  for (const [i, data] of days) {
    if (i % 8 === 0) {
      filteredDays.push(data);
    }
  }
  return (
    <Flex
      margin="5rem auto"
      w="60%"
      alignItems="center"
      justifyContent="center"
    >
      {" "}
      {filteredDays.map((day) => (
        <Day key={day.dt} day={day} />
      ))}{" "}
    </Flex>
  );
}

export default FiveDays;
