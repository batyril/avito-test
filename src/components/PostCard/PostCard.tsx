import { Box, Heading, Text, Image, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import getDefaultImage from '../../helper/getDefaultImage.ts';
import ROUTES from '../../const/routes.ts';

interface PostCardProps {
  id: number;
  name: string;
  description: string;
  location: string;
  type: string;
  image?: string;
}

const PostCard = ({
  id,
  name,
  description,
  location,
  type,
  image,
}: PostCardProps) => {
  return (
    <Box p={4} borderWidth='1px' borderRadius='lg' boxShadow='md'>
      <Image
        width='100%'
        height='200px'
        objectFit='contain'
        borderRadius='lg'
        src={image || getDefaultImage()}
        alt={name}
        mb={4}
      />
      <Heading as='h2' size='md' mb={2}>
        {name}
      </Heading>
      <Text mb={4}>Описание: {description}</Text>
      <Text>Местоположение: {location}</Text>
      <Text>Категория: {type}</Text>
      <Flex justifyContent='flex-end' mt={4}>
        <Button as={Link} to={ROUTES.ITEM(id)} colorScheme='blue' size='lg'>
          Открыть
        </Button>
      </Flex>
    </Box>
  );
};

export default PostCard;
