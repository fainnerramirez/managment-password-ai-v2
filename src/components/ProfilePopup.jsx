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
  Spinner,
  Wrap,
  WrapItem,
  Avatar,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { GetPasswordById, GetPasswordsByUser } from "../firebase/actions";
import { toast } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import moment from "moment/moment";
import { UserContext } from "../context/userContext";
import { FaRegEye, FaRegEyeSlash, FaUserCog } from "react-icons/fa";
import "moment/locale/es";
moment.locale("es");

const ProfilePopup = ({ password }) => {
  const [alias, setAlias] = useState("");
  const [disableSave, setDisabledSave] = useState(false);
  const [resultPassword, setResultPassword] = useState([]);
  const [viewPass, setViewPass] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(UserContext);

  const HandlePasswordSingle = async (passwordId) => {
    const response = await GetPasswordById(passwordId);
    console.log("Response get password Single: ", response);
  };

  useEffect(() => {
    const GetAll = async (event) => {
      const response = await GetPasswordsByUser(user?.uid);
      console.log("Response get all: ", response);
      setResultPassword(response);
      return;
    };

    GetAll();
  }, [user]);

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
            <Wrap>
              <WrapItem display={"flex"} alignItems={"center"}>
                <Avatar size="md" name="Dan Abrahmov" src={user?.photoURL} />
                <Text ml={5}>¡Bienvenido {user?.displayName}! </Text>
              </WrapItem>
            </Wrap>
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
                  {resultPassword.length ? (
                    resultPassword.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.alias}</Td>
                        <Td>{moment(item.dateCreated).fromNow()}</Td>
                        <Td width={200}>
                          <InputGroup size="md">
                            <Input
                              width={150}
                              pr="4.5rem"
                              type={viewPass ? "text" : "password"}
                              value={item.password}
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() => setViewPass(!viewPass)}
                              >
                                {viewPass ? <FaRegEyeSlash /> : <FaRegEye />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Text>No hay contraseñas guardadas</Text>
                  )}
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
