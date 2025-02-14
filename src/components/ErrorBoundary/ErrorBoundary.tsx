import { Component, ErrorInfo, ReactNode } from 'react';
import { Heading, Text, Button, Center, VStack } from '@chakra-ui/react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <Center minH='100vh'>
          <VStack spacing={4} textAlign='center'>
            <Heading as='h1' size='2xl'>
              Произошла ошибка
            </Heading>
            <Text fontSize='lg'>
              Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова.
            </Text>
            <Button
              colorScheme='teal'
              size='lg'
              variant='outline'
              onClick={() => window.location.reload()}
            >
              Обновить страницу
            </Button>
          </VStack>
        </Center>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
