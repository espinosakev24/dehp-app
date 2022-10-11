import { Box } from '@chakra-ui/react';
import React from 'react';

export const PlusIcon = ({ color, ...props }) => (
  <Box>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{ fill: color || 'rgba(0, 0, 0, 1)' }}
      {...props}
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>
    </svg>
  </Box>
);
