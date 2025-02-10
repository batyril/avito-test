import { Button, Box, VStack, Heading, Text } from '@chakra-ui/react'; // Импортируем компоненты Chakra UI
import { Link } from 'react-router-dom'; // Импортируем Link для навигации

const items = [
  { id: 1, title: 'Объявление 1', description: 'Описание объявления 1' },
  { id: 2, title: 'Объявление 2', description: 'Описание объявления 2' },
  { id: 3, title: 'Объявление 3', description: 'Описание объявления 3' },
];

const ListPage = () => {
  return (
    <Box p={4}>
      <Heading as='h1' size='xl' mb={6}>
        Список объявлений
      </Heading>

      <Button as={Link} to='/form' colorScheme='teal' size='md' mb={6}>
        Создать новое объявление
      </Button>

      <VStack spacing={4} align='stretch'>
        {items.map((item) => (
          <Box
            key={item.id}
            p={4}
            borderWidth='1px'
            borderRadius='lg'
            boxShadow='md'
          >
            <Heading as='h2' size='md' mb={2}>
              {item.title}
            </Heading>
            <Text mb={4}>{item.description}</Text>
            <Button
              as={Link}
              to={`/item/${item.id}`}
              colorScheme='blue'
              size='sm'
            >
              Открыть
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ListPage;
