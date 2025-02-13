import { Flex, Input, Select } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { Post } from '../../model/posts.ts';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  data: Post[] | undefined;
}

const Filters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  data,
}: FiltersProps) => {
  const categories = Array.from(new Set(data?.map((item) => item.type) || []));

  return (
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
  );
};

export default Filters;
