import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { http, HttpResponse } from 'msw';

import { setupServer } from 'msw/node';
import ListPage from '../pages/ListPage';
import { store } from '../services/store.ts';
import { ChakraProvider } from '@chakra-ui/react';

const server = setupServer(
  http.get('http://localhost:5173/api/items', () => {
    return HttpResponse.json([
      {
        id: '1',
        name: 'Квартира в центре',
        description: 'Просторная квартира в центре города',
        location: 'Москва',
        type: 'Недвижимость',
        propertyType: 'Квартира',
        area: 100,
        rooms: 3,
        price: 15000000,
      },
      {
        id: '2',
        name: 'Объявление 2',
        description: 'Другое объявление',
        location: 'Питер',
        type: 'Авто',
        propertyType: 'Машина',
        price: 500000,
      },
    ]);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('отображает список объявлений после загрузки', async () => {
  render(
    <ChakraProvider>
      <Provider store={store}>
        <MemoryRouter>{<ListPage />}</MemoryRouter>
      </Provider>
    </ChakraProvider>,
  );
  await waitFor(() => {
    expect(screen.getByText('Квартира в центре')).toBeInTheDocument();
    expect(screen.getByText('Объявление 2')).toBeInTheDocument();
  });
});
