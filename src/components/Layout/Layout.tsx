import React from 'react';
import { Box, Container } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxW='container.md' py={8}>
      <Box p={4} borderWidth='1px' borderRadius='lg' boxShadow='md'>
        {children}
      </Box>
    </Container>
  );
};

export default Layout;
