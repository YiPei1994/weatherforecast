import React, { useState } from "react";
import { useWeatherContext } from "../Context/WeatherContext";
import { Button, Flex, Input } from "@chakra-ui/react";

function SearchBar() {
  const [city, setCity] = useState("");
  const { handleSearch } = useWeatherContext();
  return (
    <Flex margin="5rem auto">
      <Input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        border="none"
        placeholder="type city to search..."
      />
      <Button onClick={() => handleSearch(city)} colorScheme="teal">
        Search
      </Button>
    </Flex>
  );
}

export default SearchBar;
