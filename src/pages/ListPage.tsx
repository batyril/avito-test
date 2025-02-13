import {
  Button,
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  HStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useGetPostsQuery } from '../services/api.ts';
import ROUTES from '../const/routes.ts';
import { AddIcon } from '@chakra-ui/icons';
import Pagination from '../Pagination';
import { usePagination } from '../hooks/usePagination.ts';
import useFilteredPosts from '../hooks/useFilteredPosts.ts';
import Filters from '../components/Filters';
import PostList from '../components/PostList';

const postsPerPage = 2;

const ListPage = () => {
  const { data, error, isLoading, isSuccess } = useGetPostsQuery();

  const {
    filteredPosts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useFilteredPosts(data);

  const { currentPage, totalPages, currentItems, onChangePage } = usePagination(
    filteredPosts,
    postsPerPage,
  );

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

        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          data={data}
        />

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
          <PostList
            posts={currentItems}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
          />
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
