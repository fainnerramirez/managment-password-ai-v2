import Footer from './components/Footer';
import Navbar from './components/Navbar';
import logo from './logo.svg';
import { Box, Button, HStack, Heading, Image, Input, InputGroup, InputLeftAddon, NumberInput, NumberInputField, Select, Spinner, VStack, useClipboard } from '@chakra-ui/react';
import password from "./assets/password.jpg";
import { useState } from 'react';
import { getGeneratePassword } from './openai/api';

const getOptionComplexity = (option) => {
  let options = {
    "1": "Letras mayúsculas",
    "2": "Letras minúsculas",
    "3": "Números y Caracteres especiales",
    "4": "Letras mayúsculas, Letras minúsculas, Números y Caracteres especiales"
  };
  return options[option];
}

function App() {
  const [generatePassword, setGeneratePassword] = useState(null);
  const [long, setLong] = useState(null);
  const [complexity, setComplexity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { onCopy, value, setValue, hasCopied } = useClipboard(generatePassword);

  const GetPasswordSecurityAI = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const password = await getGeneratePassword(long, getOptionComplexity(complexity));
    console.log("Password security: " + JSON.stringify(password.choices[0].message.content, null, 2));
    const passwordGenerator = password.choices[0].message.content;
    setGeneratePassword(passwordGenerator);
    setIsLoading(false);
    return password;
  }

  return (
    <Box>
      <Navbar />
      <HStack w={'100%'}>
        <Box bg={'#F4EEE0'} h={'100vh'} w={'50%'}>
          <Box textAlign={'center'}>
            <Heading color={'#1E5F74'} mt={10}>Crea contraseñas de manera <br /> segura con IA</Heading>
          </Box>
          <Box mt={10}>
            <VStack spacing={10} w={{ base: '100%', md: '80%', lg: '50%' }} m={'auto'}>
              <InputGroup>
                <InputLeftAddon bg={'#1E5F74'} color={'#ffffff'}>
                  Longitud
                </InputLeftAddon>
                <NumberInput max={25} min={8} w={'100%'}>
                  <NumberInputField placeholder='Ingrese la longitud de la contraseña' bg={'white'} onChange={(e) => setLong(e.target.value)}/>
                </NumberInput>
              </InputGroup>
              <Select bg={'#1E5F74'} placeholder='Escoja la complejidad de la contraseña' color={"#ffffff"} onChange={(e) => setComplexity(e.target.value)}>
                <option value='1' style={{ color: "#1E5F74" }}>Letras mayúsculas</option>
                <option value='2' style={{ color: "#1E5F74" }}>Letras minúsculas</option>
                <option value='3' style={{ color: "#1E5F74" }}>Números y caractéres especiales</option>
                <option value='4' style={{ color: "#1E5F74" }}>Todas las anteriores</option>
              </Select>
              <Box>
                <Button
                  onClick={GetPasswordSecurityAI}
                  colorScheme='orange'
                  isDisabled={!long || !complexity}
                  isLoading={isLoading}>
                  Generar contraseña con IA
                </Button>
              </Box>
            </VStack>
          </Box>
        </Box>
        <VStack w={'50%'} height={'100vh'}>
          <Image mt={100} src={password} height={300} width={300} borderRadius={10} />
          {
            isLoading ? <Spinner
              mt={10}
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='green.500'
              size='xl'
            />
              :
              <VStack spacing={5} width={'50%'} mt={50}>
                <Input
                  placeholder="Contraseña Generada"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  readOnly
                  fontSize={30}
                  variant={'unstyled'}
                  textAlign={'center'}
                />
                <Button
                  colorScheme='orange'
                  onClick={onCopy}
                  isDisabled={!generatePassword}>{hasCopied ? "Copiado!" : "Copiar Contraseña"}</Button>
              </VStack>
          }
        </VStack>
      </HStack>
      <Footer />
    </Box>
  );
}

export default App;