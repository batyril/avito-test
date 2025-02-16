import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../pages/NotFound.tsx';

test('переход на случайный адрес отображает страницу 404', () => {
  render(
    <MemoryRouter initialEntries={['/random-nonexistent-route']}>
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
  expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
  expect(screen.getByText('Перейти к списку объявлений')).toBeInTheDocument();
});
