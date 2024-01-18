import { useEffect, useState } from "react";
import { GET_CURRENCY } from "../library/graphql";
import { fetchData } from "../library/api";
import {
  Flex,
  Input,
  Heading,
  Button,
  Spinner,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const CountryCurrency = () => {
  const [countryName, setCountryName] = useState("");
  const [currency, setCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const resetItems = () => {
    setError("");
    setCurrency("");
  };

  //form handler
  const submitHandler = async () => {
    resetItems();
    setIsLoading(true);
    if (!countryName) {
      setError("Please enter your country name");
      setIsLoading(false);
      return;
    }

    try {
      const result = await fetchData(GET_CURRENCY, { countryName });
      if (result.status != "200") {
        throw new Error("Cant Connect to Api");
      }
      setCurrency(result.data.data.item[0].currency[0].object.nameEn);
    } catch (error) {
      setError("Cant resolve this country");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCountryName(
      (country) => country.charAt(0).toUpperCase() + country.slice(1)
    );
  }, [countryName]);

  return (
    <Flex
      direction="column"
      background="gray.200"
      p={12}
      rounded={6}
      gap={3}
      justifyContent="center"
      alignItems="center"
    >
      <Heading mb={6} as="h2" size="lg">
        Country Currency App
      </Heading>

      <FormControl isInvalid={!countryName && error}>
        <FormLabel>Country Name</FormLabel>
        <Input
          type="email"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          placeholder="Enter your country name"
          background="gray.100"
        />

        <Flex>
          {!error ? (
            <Text color="teal">{currency}</Text>
          ) : (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}
        </Flex>

        <Button
          onClick={submitHandler}
          colorScheme="teal"
          disabled={isLoading}
          width="100%"
          mt={3}
        >
          {isLoading ? <Spinner /> : "Submit"}
        </Button>
      </FormControl>
    </Flex>
  );
};

export default CountryCurrency;
