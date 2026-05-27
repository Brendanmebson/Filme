import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

const LoadingSpinner = ({ size = 'md' }) => {
  const chakraSizes = {
    sm: 'xs',
    md: 'md',
    lg: 'xl',
  };

  return (
    <Center py={8}>
      <Spinner
        size={chakraSizes[size]}
        color="blue.500"
        borderWidth="4px"
        animationDuration="0.8s"
      />
    </Center>
  );
};

export default LoadingSpinner;