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
import Pagination from '../Pagination';
import { usePagination } from '../hooks/useHook.ts';
import PostCard from '../components/PostCard';

const ListPage = () => {
  const { data, error, isLoading, isSuccess } = useGetPostsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredPosts =
    data?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? item.type === selectedCategory : true),
    ) || [];
  const postsPerPage = 2;

  const { currentPage, totalPages, currentItems, onChangePage } = usePagination(
    filteredPosts,
    postsPerPage,
  );

  const categories = Array.from(new Set(data?.map((item) => item.type) || []));

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
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <PostCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  location={item.location}
                  type={item.type}
                  image={item.image}
                />
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

        {filteredPosts.length > postsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={onChangePage}
          />
        )}
      </Box>
    </Layout>
  );
};

export default ListPage;
