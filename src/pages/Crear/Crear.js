import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { MainWrapper } from 'components';
import { CrearPalabra } from './CrearPalabra';
import { CrearRefran } from './CrearRefran';

export const Crear = () => (
  <MainWrapper>
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>Crear palabra</Tab>
        <Tab>Crear refrán</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CrearPalabra />
        </TabPanel>
        <TabPanel>
          <CrearRefran />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </MainWrapper>
);
