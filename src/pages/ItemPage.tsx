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
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { useGetPostByIdQuery } from '../services/api.ts';
import Layout from '../components/Layout';
import getDefaultImage from '../helper/getDefaultImage.ts';
import CategoryDetails from '../components/CategoryDetails';
import ROUTES from '../const/routes.ts';
import Header from '../components/Header';

const ItemPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, isSuccess } = useGetPostByIdQuery(id ?? '');

  return (
    <>
      <Header text={'объявление'} isButtonCreated isButtonList />
      <Layout>
        <Box p={4}>
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
            <Box mb={8}>
              <Heading as='h2' size='lg' mb={4}>
                {data.name}
              </Heading>

              <Stack divider={<StackDivider />} spacing={4} mb={6}>
                <Image
                  width='100%'
                  maxWidth='600px'
                  objectFit='contain'
                  borderRadius='lg'
                  src={data.image || getDefaultImage()}
                  alt={data.name}
                  mb={6}
                />
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Описание
                  </Heading>
                  <Text pt={2} fontSize='sm'>
                    {data.description}
                  </Text>
                </Box>

                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Местоположение
                  </Heading>
                  <Text pt={2} fontSize='sm'>
                    {data.location}
                  </Text>
                </Box>

                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Категория
                  </Heading>
                  <Text pt={2} fontSize='sm'>
                    {data.type}
                  </Text>
                </Box>
              </Stack>

              <CategoryDetails data={data} />
            </Box>
          )}

          <Button
            as={Link}
            to={id && ROUTES.ITEM_EDIT(id)}
            colorScheme='green'
            size='md'
          >
            Редактировать
          </Button>
        </Box>
      </Layout>
    </>
  );
};

export default ItemPage;
