import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  Image,
} from '@chakra-ui/react';
import { useGetPostByIdQuery } from '../services/api.ts';
import Layout from '../components/Layout';
import getDefaultImage from '../helper/getDefaultImage.ts';
import CategoryDetails from '../components/CategoryDetails';
import ROUTES from '../const/routes.ts';

const ItemPage = () => {
  const { id } = useParams();

  const { data, error, isLoading, isSuccess } = useGetPostByIdQuery(id);

  return (
    <Layout>
      <Box p={4}>
        <Heading as='h1' size='xl' mb={4}>
          Просмотр объявления с ID: {id}
        </Heading>

        {isLoading && (
          <Box textAlign='center'>
            <Spinner size='xl' />
            <Text mt={2}>Загрузка...</Text>
          </Box>
        )}

        {error && (
          <Alert status='error' mb={4}>
            <AlertIcon />
            Произошла ошибка при загрузке данных
          </Alert>
        )}

        {isSuccess && data && (
          <Box mb={6}>
            <Heading as='h2' size='lg' mb={2}>
              {data.name}
            </Heading>
            <Text>Описание: {data.description}</Text>
            <Text>Местоположение: {data.location}</Text>
            <Text>Категория: {data.type}</Text>
            <Image
              width='100%'
              height='400px'
              objectFit='contain'
              borderRadius='lg'
              src={data.image || getDefaultImage()}
              alt={data.name}
              mb={4}
            />

            <CategoryDetails data={data} />
          </Box>
        )}

        <Button
          as={Link}
          to={id && ROUTES.ITEM_EDIT(id)}
          colorScheme='teal'
          size='md'
        >
          Редактировать
        </Button>
      </Box>
    </Layout>
  );
};

export default ItemPage;
