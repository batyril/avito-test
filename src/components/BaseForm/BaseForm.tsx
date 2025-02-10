import { useFormContext } from 'react-hook-form';
import {
  VStack,
  Button,
  Select,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';

interface BaseFormProps {
  onNext: () => void;
}

const BaseForm = ({ onNext }: BaseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  return (
    <VStack as='form' onSubmit={handleSubmit(onNext)} spacing={4}>
      <FormControl isInvalid={!!errors.title}>
        <FormLabel htmlFor='location'>Название объявления</FormLabel>
        <Input {...register('title', { required: 'Название обязательно' })} />
        <FormErrorMessage>{errors.title?.message?.toString()}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.description}>
        <FormLabel htmlFor='location'>Описание объявления</FormLabel>
        <Input
          {...register('description', { required: 'Описание обязательно' })}
        />
        <FormErrorMessage>
          {errors.description?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.location}>
        <FormLabel htmlFor='location'> Местоположение</FormLabel>
        <Input {...register('location', { required: 'Локация обязательна' })} />
        <FormErrorMessage>
          {errors.location?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.category}>
        <FormLabel htmlFor='location'> Выберите категорию</FormLabel>
        <Select {...register('category', { required: 'Выберите категорию' })}>
          <option value='Недвижимость'>Недвижимость</option>
          <option value='Авто'>Авто</option>
          <option value='Услуги'>Услуги</option>
        </Select>
        <FormErrorMessage>
          {errors.category?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <Button type='submit'>Далее</Button>
    </VStack>
  );
};

export default BaseForm;
