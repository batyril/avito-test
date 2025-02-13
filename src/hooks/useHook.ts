import { useState } from 'react';
import { Post } from '../model/posts.ts';

export const usePagination = (items: Post[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const onChangePage = (type: 'prev' | 'next') => {
    setCurrentPage((prev) => {
      if (type === 'next' && prev < totalPages) return prev + 1;
      if (type === 'prev' && prev > 1) return prev - 1;
      return prev;
    });
  };

  return { currentPage, totalPages, currentItems, onChangePage };
};
