import React from 'react';
import { Box, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { MainWrapper, Navbar } from 'components';

export const Dashboard = () => (
  <Box>
    <Navbar></Navbar>
    <MainWrapper>
      <Box>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
          />
          <Input type="text" placeholder="Buscar palabra" size="lg" />
        </InputGroup>
      </Box>
    </MainWrapper>
  </Box>
);
