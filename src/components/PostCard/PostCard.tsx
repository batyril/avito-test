import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
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
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Image
        objectFit='cover'
        aspectRatio={1}
        maxW={{ base: '100%', sm: '300px' }}
        src={image || getDefaultImage()}
        alt={name}
      />

      <Stack flex='1' p={4}>
        <CardBody>
          <Heading size='md' mb={2}>
            {name}
          </Heading>

          <Flex mb={2} gap={4} alignItems='center'>
            <Text fontWeight='bold' color='teal.600' fontSize='lg'>
              Описание:
            </Text>
            <Text noOfLines={3}>{description}</Text>
          </Flex>

          <Flex mb={2} gap={4} alignItems='center'>
            <Text fontWeight='bold' color='teal.600' fontSize='lg'>
              Местоположение:
            </Text>
            <Text>{location}</Text>
          </Flex>

          <Flex mb={2} gap={4} alignItems='center'>
            <Text fontWeight='bold' color='teal.600' fontSize='lg'>
              Категория:
            </Text>
            <Text>{type}</Text>
          </Flex>
        </CardBody>

        <CardFooter>
          <Button as={Link} to={ROUTES.ITEM(id)} colorScheme='green'>
            Открыть
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default PostCard;
