import { Button, Box, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ROUTES from '../const/routes.ts';
//TODO: добавить анимацию
const NotFoundPage = () => {
  return (
    <Layout>
      <Box textAlign='center' p={10}>
        <Heading as='h1' size='2xl' mb={4}>
          404
        </Heading>
        <Text fontSize='xl' mb={6}>
          Страница не найдена
        </Text>
        <Button as={Link} to={ROUTES.LIST} colorScheme='blue' size='lg'>
          Перейти к списку объявлений
        </Button>
      </Box>
    </Layout>
  );
};

export default NotFoundPage;
