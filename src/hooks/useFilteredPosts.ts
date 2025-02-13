import { useState, useMemo } from 'react';
import { Post } from '../model/posts.ts';

const useFilteredPosts = (posts: Post[] | undefined) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredPosts = useMemo(() => {
    return (
      posts?.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory ? item.type === selectedCategory : true),
      ) || []
    );
  }, [posts, searchTerm, selectedCategory]);

  return {
    filteredPosts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };
};

export default useFilteredPosts;
