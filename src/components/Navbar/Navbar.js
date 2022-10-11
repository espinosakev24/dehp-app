import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import LogoImg from 'assets/logo.png';
import { PlusIcon } from 'assets';
import { Link } from 'react-router-dom';

export const Navbar = () => (
  <Flex
    h="70px"
    borderBottom="1px solid"
    borderColor="gray.300"
    boxShadow="md"
    px="24px"
    justifyContent="space-between"
    alignItems="center"
    bgColor="white"
  >
    <Flex justify="center" alignItems="center" gap="12px">
      <Box>
        <img src={LogoImg} alt="logo" width="40px" height="40px"></img>
      </Box>
      <Text fontSize="14px" maxWidth="300px" textAlign="left" fontWeight="bold">
        Diccionario electrónico del habla popular de los valles de los ríos Sinú
        y San Jorge
      </Text>
    </Flex>
    <Flex gap="20px" alignItems="center">
      <Link to="/palabras">
        <Text cursor="pointer">Palabras</Text>
      </Link>

      <Link to="/refranes">
        <Text cursor="pointer">Refranes</Text>
      </Link>

      <Link to="/crear">
        <PlusIcon cursor="pointer" title="Agrega nueva palabra" />
      </Link>
    </Flex>
  </Flex>
);
