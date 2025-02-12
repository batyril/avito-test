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
import { ArrowForwardIcon } from '@chakra-ui/icons';

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
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor='location'>Название объявления</FormLabel>
        <Input {...register('name', { required: 'Название обязательно' })} />
        <FormErrorMessage>{errors.name?.message?.toString()}</FormErrorMessage>
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
      <FormControl isInvalid={!!errors.type}>
        <FormLabel htmlFor='location'> Выберите категорию</FormLabel>
        <Select {...register('type', { required: 'Выберите категорию' })}>
          <option value='Недвижимость'>Недвижимость</option>
          <option value='Авто'>Авто</option>
          <option value='Услуги'>Услуги</option>
        </Select>
        <FormErrorMessage>{errors.type?.message?.toString()}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.image}>
        <FormLabel htmlFor='image'>Ссылка на картинку/фото</FormLabel>
        <Input
          {...register('image', {
            pattern: {
              value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
              message: 'Введите корректную ссылку на изображение',
            },
          })}
        />
        <FormErrorMessage>{errors.image?.message?.toString()}</FormErrorMessage>
      </FormControl>
      <Button
        type='submit'
        colorScheme='green'
        rightIcon={<ArrowForwardIcon />}
      >
        Далее
      </Button>
      ;
    </VStack>
  );
};

export default BaseForm;
