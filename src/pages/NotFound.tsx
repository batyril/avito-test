import { Button, Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ROUTES from '../const/routes.ts';
import { Player } from '@lottiefiles/react-lottie-player';
import animate from '../assets/notFound.json';

const NotFoundPage = () => {
  return (
    <Layout>
      <Box textAlign='center' p={10}>
        <Player
          autoplay
          loop
          src={animate}
          style={{
            height: '100%',
            width: '100%',
            maxHeight: '450px',
            maxWidth: '450px',
          }}
        />
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
