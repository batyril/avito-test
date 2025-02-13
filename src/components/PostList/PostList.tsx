import { VStack, Text } from '@chakra-ui/react';
import PostCard from '../PostCard';
import { Post } from '../../model/posts.ts';

interface PostListProps {
  posts: Post[];
  searchTerm: string;
  selectedCategory: string;
}

const PostList = ({ posts, searchTerm, selectedCategory }: PostListProps) => {
  return (
    <VStack spacing={4} align='stretch'>
      {posts.length > 0 ? (
        posts.map((item) => (
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
  );
};

export default PostList;
