import { useState } from 'react';
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
  Input,
  Select,
  HStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useGetPostsQuery } from '../services/api.ts';
import ROUTES from '../const/routes.ts';
import { AddIcon } from '@chakra-ui/icons';

const ListPage = () => {
  const { data, error, isLoading, isSuccess } = useGetPostsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const defaultImage =
    'https://azaliadecor.ru/upload/iblock/5c7/pya5k5qetqhcd2lm4finiaulj4hjv7pq.jpg';

  const categories = Array.from(new Set(data?.map((item) => item.type) || []));

  const filteredPosts =
    data?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? item.type === selectedCategory : true),
    ) || [];

  return (
    <Layout>
      <Box p={4}>
        <HStack justifyContent='space-between'>
          <Heading as='h1' size='xl' mb={6}>
            Список объявлений
          </Heading>
          <Button
            as={Link}
            to={ROUTES.FORM}
            size='md'
            mb={6}
            leftIcon={<AddIcon />}
            colorScheme='green'
          >
            Создать новое объявление
          </Button>
        </HStack>

        <Flex gap={4} mb={4}>
          <Input
            placeholder='Поиск по названию...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            placeholder='Выберите категорию'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </Flex>

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
            {filteredPosts.length > 0 ? (
              filteredPosts.map((item) => (
                <Box
                  key={item.id}
                  p={4}
                  borderWidth='1px'
                  borderRadius='lg'
                  boxShadow='md'
                >
                  <Image
                    width='100%'
                    height='200px'
                    objectFit='contain'
                    borderRadius='lg'
                    src={item.image || defaultImage}
                    alt={item.name}
                    mb={4}
                  />
                  <Heading as='h2' size='md' mb={2}>
                    {item.name}
                  </Heading>
                  <Text mb={4}>Описание: {item.description}</Text>
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
                {searchTerm || selectedCategory
                  ? 'По вашему запросу ничего не найдено.'
                  : 'Нет доступных объявлений.'}
              </Text>
            )}
          </VStack>
        )}
      </Box>
    </Layout>
  );
};

export default ListPage;
