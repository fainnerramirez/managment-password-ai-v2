import {
  Box,
  Button,
  Heading,
  HStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("#86A789", "gray.700");
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      bg={bg}
      alignItems={"center"}
    >
      <HStack spacing={5} width={"90%"}>
        <Box>
          <img
            src={require("../assets/password.png")}
            alt="OpenAI Logo"
            width={70}
          />
        </Box>
        <Heading color={"#fff"} fontSize={30} textAlign={"left"}>
          Passwords.ai
        </Heading>
      </HStack>
      <Box padding={10}>
        <Button
          onClick={toggleColorMode}
          bg={bg}
          borderColor={"white"}
          borderWidth={1}
        >
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
