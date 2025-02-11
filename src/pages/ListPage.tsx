import {
  Button,
  Box,
  VStack,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Image,
  Flex,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useGetPostsQuery } from '../services/api.ts';

const ListPage = () => {
  const { data, error, isLoading, isSuccess } = useGetPostsQuery();
  const defaultImage = 'https://cdn1.ozone.ru/s3/multimedia-1-z/6980409107.jpg';
  return (
    <Layout>
      <Box p={4}>
        <Heading as='h1' size='xl' mb={6}>
          Список объявлений
        </Heading>

        <Button as={Link} to='/form' colorScheme='teal' size='md' mb={6}>
          Создать новое объявление
        </Button>

        {isLoading && (
          <Box textAlign='center'>
            <Spinner size='xl' />
            <Text mt={2}>Загрузка...</Text>
          </Box>
        )}

        {error && (
          <Alert status='error' mb={6}>
            <AlertIcon />
            Произошла ошибка при загрузке данных
          </Alert>
        )}

        {isSuccess && (
          <VStack spacing={4} align='stretch'>
            {data.length > 0 ? (
              data.map((item) => (
                <Box
                  key={item.id}
                  p={4}
                  borderWidth='1px'
                  borderRadius='lg'
                  boxShadow='md'
                >
                  <Image
                    borderRadius='lg'
                    src={item.image || defaultImage}
                    alt={item.name}
                    mb={4}
                  />
                  <Heading as='h2' size='md' mb={2}>
                    {item.name}
                  </Heading>
                  <Text mb={4}> Описание:{item.description}</Text>
                  <Text>Местоположение: {item.location}</Text>
                  <Text>Категория: {item.type}</Text>

                  <Flex justifyContent='flex-end' mt={4}>
                    <Button
                      as={Link}
                      to={`/item/${item.id}`}
                      colorScheme='blue'
                      size='lg'
                    >
                      Открыть
                    </Button>
                  </Flex>
                </Box>
              ))
            ) : (
              <Text textAlign='center' fontSize='lg' color='gray.500'>
                Нет доступных объявлений.
              </Text>
            )}
          </VStack>
        )}
      </Box>
    </Layout>
  );
};

export default ListPage;
