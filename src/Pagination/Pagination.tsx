import { Button, Flex, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChangePage: (type: 'prev' | 'next') => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onChangePage,
}: PaginationProps) => {
  return (
    <Flex justifyContent='center' alignItems='center' mt={6} gap={4}>
      <Button
        leftIcon={<ChevronLeftIcon />}
        onClick={() => onChangePage('prev')}
        isDisabled={currentPage === 1}
      >
        Назад
      </Button>
      <Text>
        Страница {currentPage} из {totalPages}
      </Text>
      <Button
        rightIcon={<ChevronRightIcon />}
        onClick={() => onChangePage('next')}
        isDisabled={currentPage === totalPages}
      >
        Вперед
      </Button>
    </Flex>
  );
};

export default Pagination;
