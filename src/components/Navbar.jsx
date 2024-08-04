import { Box, Heading, HStack } from "@chakra-ui/react";
import React from "react";

const Navbar = () => {
  return (
    <HStack spacing={5} padding={5} bg={"#424769"}>
      <Box>
        <img
          src={require("../assets/password.png")}
          alt="OpenAI Logo"
          width={100}
        />
      </Box>
      <Heading color={"#fff"} fontSize={30} textAlign={"left"}>
        Passwords.ai
      </Heading>
    </HStack>
  );
};

export default Navbar;
