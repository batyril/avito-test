import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { http, HttpResponse } from 'msw';

import { setupServer } from 'msw/node';
import { store } from '../services/store.ts';
import { ChakraProvider } from '@chakra-ui/react';
import { ItemPage } from '../pages';

const server = setupServer(
  http.get('http://localhost:5173/api/items/1', () => {
    return HttpResponse.json({
      id: '1',
      name: 'Квартира в центре',
      description: 'Просторная квартира в центре города',
      location: 'Москва',
      type: 'Недвижимость',
      propertyType: 'Квартира',
      area: 100,
      rooms: 3,
      price: 15000000,
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('отображает список объявлений после загрузки', async () => {
  render(
    <ChakraProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={['/items/1']}>
          <Routes>
            <Route path='/items/:id' element={<ItemPage />} />{' '}
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>,
  );

  await waitFor(() => {
    expect(
      screen.getByText('Просторная квартира в центре города'),
    ).toBeInTheDocument();
    expect(screen.getByText('Недвижимость')).toBeInTheDocument();
  });
});
