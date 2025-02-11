import AppRouter from './Routing.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './services/store.ts';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
