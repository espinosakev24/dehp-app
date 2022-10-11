import React, { useEffect, useState } from 'react';
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { MainWrapper } from 'components';
// import { Link } from 'react-router-dom';

import http from 'http/http';

export const Refranes = () => {
  const [refranes, setRefranes] = useState([]);
  useEffect(() => {
    http.get('refran').then(data => {
      setRefranes(data);
    });
  }, []);
  return (
    <Box>
      <MainWrapper>
        <Box>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
            <Input type="text" placeholder="Buscar refrán" size="lg" />
          </InputGroup>
        </Box>

        <Flex
          direction="column"
          my="12px"
          pb="24px"
          maxH="500px"
          overflowY="scroll"
          px="30px"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="10px"
          boxShadow="md"
          gap="12px"
          py="12px"
        >
          {refranes.map(({ _id, lema }, index) => (
            <Flex
              justifyContent="space-between"
              px="30px"
              key={`palabra-${index}`}
              p="12px 24px"
              borderBottom="1px solid"
              borderColor="gray.200"
              borderRadius="8px"
              boxShadow="sm"
            >
              <Text>{lema}</Text>
              <Text color="blue.500">
                {/* <Link to={`/refranes/${_id}`}>Ver más</Link> */}
                <a
                  href={`https://diccionario-electronico.herokuapp.com/#/refran/${_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver más
                </a>
              </Text>
            </Flex>
          ))}
        </Flex>
      </MainWrapper>
    </Box>
  );
};
