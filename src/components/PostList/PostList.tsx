import { VStack, Text, Button } from '@chakra-ui/react';
import PostCard from '../PostCard';
import { Post } from '../../model/posts.ts';
import animate from '../../assets/empty.json';
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';
import ROUTES from '../../const/routes.ts';

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
          {searchTerm || selectedCategory ? (
            'По вашему запросу ничего не найдено.'
          ) : (
            <VStack spacing={2} align='center'>
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
              <Text fontSize='lg' color='gray.500'>
                Объявлений пока нет
              </Text>
              <Button
                as={Link}
                to={ROUTES.FORM}
                colorScheme='teal'
                variant='solid'
              >
                Создать объявление
              </Button>
            </VStack>
          )}
        </Text>
      )}
    </VStack>
  );
};

export default PostList;
