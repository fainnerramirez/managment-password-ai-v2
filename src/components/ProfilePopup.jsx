import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Code,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { GetPasswordsByUser, registerPassword } from "../firebase/actions";
import { toast } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import moment from "moment/moment";
import { UserContext } from "../context/userContext";
import { FaUserCog } from "react-icons/fa";
import "moment/locale/es";
moment.locale("es");

const ProfilePopup = ({ password }) => {
  const [alias, setAlias] = useState("");
  const [disableSave, setDisabledSave] = useState(false);
  const [resultPassword, setResultPassword] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const GetAll = async (event) => {
      const response = await GetPasswordsByUser(user?.uid);
      setResultPassword(response);
    };

    GetAll();
  }, [resultPassword]);

  return (
    <>
      <Tooltip label="Debes iniciar sesión">
        <Button
          rightIcon={<FaUserCog />}
          colorScheme="orange"
          onClick={onOpen}
          isDisabled={user === null}
        >
          Mi Perfil
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
        motionPreset="slideInBottom"
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader background={"#DD6B20"} color={"#FFFFFF"}>
            ¡Bienvenido {user?.displayName}!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box paddingTop={5} paddingBottom={2}>
              <Text>
                <Code>Nota:</Code> Para ver la contraseña que le asignastes el{" "}
                <Code>alias</Code>, tendrás que confirmar tu cuenta.
              </Text>
            </Box>
            <Box paddingTop={1} paddingBottom={5}>
              <Text>
                Se enviará un link de confirmación al correo asociado a la
                cuenta para que puedas ver tus contraseñas.
              </Text>
            </Box>
            <TableContainer>
              <Table variant={"striped"}>
                <TableCaption>Por Fainner Ramirez</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Alias</Th>
                    <Th>Fecha de creación</Th>
                    <Th>Acciones</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {resultPassword.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.alias}</Td>
                      <Td>{moment(item.dateCreated).fromNow()}</Td>
                      <Td>
                        <Button size="sm" variant="ghost" onClick={undefined}>
                          Ver contraseña
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ProfilePopup;
