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

const ItemPage = () => {
  const { id } = useParams();

  const { data, error, isLoading, isSuccess } = useGetPostByIdQuery(id);
  const defaultImage = 'https://cdn1.ozone.ru/s3/multimedia-1-z/6980409107.jpg';

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
              borderRadius='lg'
              src={data.image || defaultImage}
              alt={data.name}
              mb={4}
            />

            {(() => {
              switch (data.type) {
                case 'Недвижимость':
                  return (
                    <Box>
                      <Text>Тип недвижимости: {data.propertyType}</Text>
                      <Text>Площадь: {data.area} м²</Text>
                      <Text>Количество комнат: {data.rooms}</Text>
                      <Text>Цена: {data.price} ₽</Text>
                    </Box>
                  );
                case 'Авто':
                  return (
                    <Box>
                      <Text>Марка: {data.brand}</Text>
                      <Text>Модель: {data.model}</Text>
                      <Text>Год выпуска: {data.year}</Text>
                      {data.mileage !== undefined && (
                        <Text>Пробег: {data.mileage} км</Text>
                      )}
                    </Box>
                  );
                case 'Услуги':
                  return (
                    <Box>
                      <Text>Тип услуги: {data.serviceType}</Text>
                      <Text>Опыт работы: {data.experience} лет</Text>
                      <Text>Стоимость: {data.cost} ₽</Text>
                      {data.workSchedule && (
                        <Text>График работы: {data.workSchedule}</Text>
                      )}
                    </Box>
                  );
                default:
                  return null;
              }
            })()}
          </Box>
        )}

        <Button as={Link} to='/form' colorScheme='teal' size='md'>
          Редактировать
        </Button>
      </Box>
    </Layout>
  );
};

//TODO: вынести в отдельную функцию
export default ItemPage;
