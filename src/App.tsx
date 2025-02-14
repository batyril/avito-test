import AppRouter from './Routing.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './services/store.ts';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ChakraProvider>
      <ErrorBoundary>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
