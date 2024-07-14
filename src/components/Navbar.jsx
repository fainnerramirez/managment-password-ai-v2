import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const Navbar = () => {
  return (
    <Box padding={10} bg={"#26355D"}>
      <Heading color={"#fff"} fontSize={30} textAlign={"center"}>
        Passwords.ai
      </Heading>
    </Box>
  );
};

export default Navbar;
