import React from 'react';
import { Box } from '@chakra-ui/react';
import { Navbar } from 'components';

export const MainWrapper = ({ children }) => (
  <Box>
    <Navbar></Navbar>

    <Box
      width="900px"
      bgColor="white"
      padding="24px 50px"
      // border="1px solid"
      // borderColor="gray.100"
      // boxShadow="lg"
      mx="auto"
      my="24px"
      borderRadius="10px"
    >
      {children}
    </Box>
  </Box>
);
