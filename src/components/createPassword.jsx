import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { registerPassword } from "../firebase/actions";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import moment from "moment";

///password={generatePassword} userId={user?.id}
const CreatePasswordPopup = () => {
  const [personalized, setPersonalized] = useState("");
  const [alias, setAlias] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(UserContext);

  const HandleCreatePassword = async (event) => {
    event.preventDefault();
    if (personalized?.length > 0) {
      let documentpassword = {
        userId: user?.uid,
        alias: alias,
        password: personalized,
        dateCreated: moment().format(),
      };
      const response = await registerPassword(documentpassword);

      if (response.status === "success") {
        toast.success("Contraseña personalizada registrada exitosamente!");
      } else if (response.status === "error") {
        toast.error("Hubo un error al registrar la contraseña personalizada");
      }
    }
  };

  return (
    <>
      <Tooltip label="Debes iniciar sesión">
        <Button
          colorScheme="orange"
          onClick={onOpen}
          isDisabled={user === null}
        >
          Crear contraseña personalizada
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>¡Bienvenido {user?.displayName}!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Crea un alias</FormLabel>
              <Input
                placeholder="Introduce un alias para tu contraseña"
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
              <FormHelperText>
                El alias será utilizado para esconder tu contraseña en el perfíl
              </FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Tu contraseña personalizada</FormLabel>
              <Input
                placeholder="Introduce tu constraseña"
                type="text"
                value={personalized}
                onChange={(e) => setPersonalized(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter width={"100%"}>
            <VStack width={"100%"}>
              <Box display={"flex"} justifyContent={"end"} width={"100%"}>
                <Button variant="ghost" onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  colorScheme="orange"
                  mr={3}
                  onClick={HandleCreatePassword}
                >
                  Guardar Contraseña
                </Button>
              </Box>
              <Box textAlign={"center"} width={"100%"}>
                <Link
                  href="https://github.com/fainnerramirez"
                  isExternal
                  textAlign={"center"}
                >
                  Por Fainner Ramirez <ExternalLinkIcon mx="2px" />
                </Link>
              </Box>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreatePasswordPopup;
