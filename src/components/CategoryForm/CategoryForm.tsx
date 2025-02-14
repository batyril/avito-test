import { useFormContext } from 'react-hook-form';
import {
  VStack,
  Button,
  Select,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
} from '@chakra-ui/react';
import { CATEGORIES } from '../../const/formSteps.ts';
import { ArrowBackIcon } from '@chakra-ui/icons';
import useFormDraft from '../../hooks/useFormDraft.ts';

interface CategoryFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const CategoryForm = ({ onSubmit, onBack }: CategoryFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext();
  const type = watch('type');

  useFormDraft('Form');

  return (
    <VStack as='form' onSubmit={handleSubmit(onSubmit)} spacing={4}>
      {type === CATEGORIES.REAL_ESTATE && (
        <>
          <FormControl isInvalid={!!errors.propertyType}>
            <FormLabel>Тип недвижимости</FormLabel>
            <Select
              {...register('propertyType', { required: 'Тип обязателен' })}
            >
              <option value='Квартира'>Квартира</option>
              <option value='Дом'>Дом</option>
              <option value='Коттедж'>Коттедж</option>
              <option value='Таунхаус'>Таунхаус</option>
              <option value='Комната'>Комната</option>
            </Select>
            <FormErrorMessage>
              {errors.propertyType?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.area}>
            <FormLabel>Площадь</FormLabel>
            <Input
              type='number'
              placeholder='0.0 м²'
              {...register('area', {
                required: 'Площадь обязательна',
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.area?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.rooms}>
            <FormLabel>Количество комнат</FormLabel>
            <Input
              type='number'
              {...register('rooms', {
                required: 'Количество комнат обязательно',
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.rooms?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.price}>
            <FormLabel>Цена</FormLabel>
            <Input
              type='number'
              placeholder='₽'
              {...register('price', {
                required: 'Цена обязательна',
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.price?.message?.toString()}
            </FormErrorMessage>
          </FormControl>
        </>
      )}
      {type === CATEGORIES.AUTO && (
        <>
          <FormControl isInvalid={!!errors.brand}>
            <FormLabel>Марка</FormLabel>
            <Select {...register('brand', { required: 'Марка обязательна' })}>
              <option value='Toyota'>Toyota</option>
              <option value='BMW'>BMW</option>
              <option value='Mercedes'>Mercedes</option>
              <option value='Audi'>Audi</option>
              <option value='Ford'>Ford</option>
              <option value='Honda'>Honda</option>
            </Select>
            <FormErrorMessage>
              {errors.brand?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.model}>
            <FormLabel>Модель</FormLabel>
            <Input {...register('model', { required: 'Модель обязательна' })} />
            <FormErrorMessage>
              {errors.model?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.year}>
            <FormLabel>Год выпуска</FormLabel>
            <Input
              type='number'
              {...register('year', {
                required: 'Год выпуска обязателен',
                valueAsNumber: true,
                min: { value: 1900, message: 'Год не может быть меньше 1900' },
                max: {
                  value: new Date().getFullYear(),
                  message: `Год не может быть больше ${new Date().getFullYear()}`,
                },
              })}
            />
            <FormErrorMessage>
              {errors.year?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.mileage}>
            <FormLabel>Пробег </FormLabel>
            <Input
              type='number'
              {...register('mileage', {
                required: 'Пробег обязателен',
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.mileage?.message?.toString()}
            </FormErrorMessage>
          </FormControl>
        </>
      )}
      {type === CATEGORIES.SERVICES && (
        <>
          <FormControl isInvalid={!!errors.serviceType}>
            <FormLabel>Тип услуги</FormLabel>
            <Select
              {...register('serviceType', {
                required: 'Тип услуги обязателен',
              })}
            >
              <option value='Ремонт'>Ремонт</option>
              <option value='Уборка'>Уборка</option>
              <option value='Доставка'>Доставка</option>
              <option value='Репетиторство'>Репетиторство</option>
              <option value='Консультации'>Консультации</option>
            </Select>
            <FormErrorMessage>
              {errors.serviceType?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.experience}>
            <FormLabel>Опыт работы</FormLabel>
            <Input
              type='number'
              {...register('experience', {
                required: 'Опыт обязателен',
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.experience?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.cost}>
            <FormLabel>Стоимость</FormLabel>
            <Input
              placeholder='₽'
              type='number'
              {...register('cost', {
                required: 'Стоимость обязательна',
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.cost?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>График работы</FormLabel>
            <Input {...register('schedule')} />
          </FormControl>
        </>
      )}
      <HStack spacing={4}>
        <Button onClick={onBack} leftIcon={<ArrowBackIcon />}>
          Назад
        </Button>
        <Button type='submit' colorScheme='blue'>
          Отправить
        </Button>
      </HStack>
    </VStack>
  );
};

export default CategoryForm;
