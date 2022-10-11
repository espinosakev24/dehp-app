import React from 'react';
import { ChakraProvider, theme, Box } from '@chakra-ui/react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Crear, Palabras, Refranes, Login } from './pages';
import { AuthContextProvider } from 'context';

function App() {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <Box backgroundColor="white" h="100vh">
          <BrowserRouter>
            <Routes path="/">
              <Route path="login" element={<Login />} />
              <Route path="refranes" element={<Refranes />} />
              <Route path="palabras" element={<Palabras />} />
              <Route path="crear" element={<Crear />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default App;
