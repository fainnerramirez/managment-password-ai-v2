import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select,
  Spinner,
  Text,
  Tooltip,
  VStack,
  useClipboard,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import password from "./assets/password.png";
import { getGeneratePassword } from "./openai/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { IoMdLogOut } from "react-icons/io";
import AliasPopup from "./components/AliasPopup";
import Layout from "./layout";
import ProfilePopup from "./components/ProfilePopup";
import { UserContext } from "./context/userContext";
import CreatePasswordPopup from "./components/createPassword";

const getOptionComplexity = (option) => {
  let options = {
    1: "Letras mayúsculas",
    2: "Letras minúsculas",
    3: "Números y Caracteres especiales",
    4: "Letras mayúsculas, Letras minúsculas, Números y Caracteres especiales",
  };
  return options[option];
};

function App() {
  const [disabledSave, setDisabledSave] = useState(true);
  const [generatePassword, setGeneratePassword] = useState(null);
  const [long, setLong] = useState(null);
  const [complexity, setComplexity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aliasPassword, setAliasPassword] = useState(null);
  const { onCopy, value, setValue, hasCopied } = useClipboard(generatePassword);

  const GetPasswordSecurityAI = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const password = await getGeneratePassword(
      long,
      getOptionComplexity(complexity)
    );
    const passwordGenerator = password.choices[0].message.content;
    setGeneratePassword(passwordGenerator);
    setDisabledSave(false);
    setIsLoading(false);
    return password;
  };

  const handleGoogleProvider = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success(`Haz iniciado sesión como ${user?.displayName}`);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await auth.signOut();
    setDisabledSave(true);
    toast.success("¡Cierre de sesión exitosa!");
  };

  return (
    <Layout>
      <Navbar />
      <HStack w={"100%"}>
        <Box bg={"#2d3250"} h={"100vh"} w={"50%"}>
          <Box textAlign={"center"}>
            <Heading color={"#ffffff"} mt={10}>
              Genera contraseñas seguras <br /> al instante con IA
            </Heading>
            <Text marginTop={10} color={"#f9b17a"}>
              Dile la longitud y la complejidad que quieres que tenga y <br />{" "}
              deja que la IA genere tu contraseña
            </Text>
          </Box>
          <Box mt={10}>
            <VStack
              spacing={10}
              w={{ base: "100%", md: "80%", lg: "50%" }}
              m={"auto"}
            >
              <InputGroup>
                <InputLeftAddon bg={"#DD6B20"} color={"#2d3250"}>
                  Longitud
                </InputLeftAddon>
                <NumberInput max={25} min={8} w={"100%"}>
                  <NumberInputField
                    placeholder="Ingrese la longitud de la contraseña"
                    bg={"white"}
                    onChange={(e) => setLong(e.target.value)}
                  />
                </NumberInput>
              </InputGroup>
              <Select
                bg={"#DD6B20"}
                placeholder="Escoja la complejidad de la contraseña"
                color={"#2d3250"}
                onChange={(e) => setComplexity(e.target.value)}
              >
                <option value="1" style={{ color: "#1E5F74" }}>
                  Letras mayúsculas
                </option>
                <option value="2" style={{ color: "#1E5F74" }}>
                  Letras minúsculas
                </option>
                <option value="3" style={{ color: "#1E5F74" }}>
                  Números y caractéres especiales
                </option>
                <option value="4" style={{ color: "#1E5F74" }}>
                  Todas las anteriores
                </option>
              </Select>
              <VStack spacing={5}>
                <Tooltip label="Escoge la logitud y la complejidad">
                  <Button
                    onClick={GetPasswordSecurityAI}
                    isDisabled={!long || !complexity}
                    isLoading={isLoading}
                    color={"#2d3250"}
                    colorScheme="orange"
                  >
                    Generar contraseña con IA
                  </Button>
                </Tooltip>
                <Box>
                  <CreatePasswordPopup />
                </Box>
                <Button
                  leftIcon={<FcGoogle />}
                  onClick={handleGoogleProvider}
                  variant={"outline"}
                  colorScheme="orange"
                >
                  Ingresa con Google
                </Button>
              </VStack>
            </VStack>
          </Box>
        </Box>
        <VStack w={"50%"} height={"100vh"}>
          <Flex marginTop={5} width={"90%"} justifyContent={"space-between"}>
            <ProfilePopup />
            <Button
              rightIcon={<IoMdLogOut />}
              colorScheme="orange"
              onClick={handleLogout}
            >
              Salir
            </Button>
          </Flex>
          <Image
            mt={50}
            src={password}
            height={300}
            width={300}
            borderRadius={10}
          />
          {isLoading ? (
            <Spinner
              mt={10}
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="green.500"
              size="xl"
            />
          ) : (
            <VStack spacing={5} width={"50%"} mt={50}>
              <Input
                placeholder="Contraseña Generada"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                readOnly
                fontSize={30}
                variant={"unstyled"}
                textAlign={"center"}
              />
              <Button
                colorScheme="orange"
                onClick={onCopy}
                isDisabled={!generatePassword}
              >
                {hasCopied ? "Copiado!" : "Copiar Contraseña"}
              </Button>
              <Box>
                <AliasPopup
                  password={generatePassword}
                  isDisabledPopup={generatePassword}
                />
              </Box>
            </VStack>
          )}
        </VStack>
      </HStack>
      <Footer />
      <ToastContainer />
    </Layout>
  );
}

export default App;
