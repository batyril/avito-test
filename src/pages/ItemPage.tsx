import { useParams } from 'react-router-dom';
import { Button, Box, Heading, Text } from '@chakra-ui/react'; // Импортируем компоненты Chakra UI
import { Link } from 'react-router-dom'; // Импортируем Link для навигации

const ItemPage = () => {
  const { id } = useParams();

  const item = {
    id: id,
    title: `Объявление ${id}`,
    description: `Описание объявления ${id}`,
  };

  return (
    <Box p={4}>
      <Heading as='h1' size='xl' mb={4}>
        Просмотр объявления с ID: {id}
      </Heading>

      <Box mb={6}>
        <Heading as='h2' size='lg' mb={2}>
          {item.title}
        </Heading>
        <Text>{item.description}</Text>
      </Box>

      <Button as={Link} to='/form' colorScheme='teal' size='md'>
        Редактировать
      </Button>
    </Box>
  );
};

export default ItemPage;
