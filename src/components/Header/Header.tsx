import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ROUTES from '../../const/routes.ts';

interface HeaderProps {
  text: string;
  isButtonCreated?: boolean;
  isButtonList?: boolean;
}

const Header = ({ text, isButtonCreated, isButtonList }: HeaderProps) => {
  return (
    <Box bg='teal.500' px={6} py={4} boxShadow='md'>
      <Flex maxW='1200px' mx='auto' justify='space-between' align='center'>
        <Heading as='h1' size='lg' color='white'>
          {text}
        </Heading>

        <Flex gap={4}>
          {isButtonCreated && (
            <Button
              as={Link}
              to={ROUTES.FORM}
              colorScheme='teal'
              variant='solid'
            >
              Создать объявление
            </Button>
          )}
          {isButtonList && (
            <Button
              as={Link}
              to={ROUTES.LIST}
              colorScheme='teal'
              variant='solid'
            >
              Все объявления
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
