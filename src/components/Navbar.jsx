import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const Navbar = () => {
  return (
    <Box padding={10} bg={"#424769"}>
      <Heading color={"#fff"} fontSize={30} textAlign={"left"}>
        Passwords.ai
      </Heading>
    </Box>
  );
};

export default Navbar;
