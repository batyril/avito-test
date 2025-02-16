import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { CATEGORIES } from '../../const/formSteps.ts';
import { FieldErrors, useFormContext } from 'react-hook-form';
import {
  AutoPost,
  Post,
  RealEstatePost,
  ServicePost,
} from '../../model/posts.ts';
import useFormDraft from '../../hooks/useFormDraft.ts';

interface CategoryFormProps {
  onSubmit: (data: Post) => void;
  onBack: () => void;
  isEditMode: boolean;
}

const CategoryForm = ({ onSubmit, onBack, isEditMode }: CategoryFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext<Post>();

  useFormDraft('Form', isEditMode);

  const type = watch('type');

  const realEstateErrors = errors as FieldErrors<RealEstatePost>;
  const autoErrors = errors as FieldErrors<AutoPost>;
  const serviceErrors = errors as FieldErrors<ServicePost>;

  return (
    <VStack as='form' onSubmit={handleSubmit(onSubmit)} spacing={4}>
      {type === CATEGORIES.REAL_ESTATE && (
        <>
          <FormControl isInvalid={!!realEstateErrors.propertyType}>
            <FormLabel>Тип недвижимости</FormLabel>
            <Select
              defaultValue=''
              {...register('propertyType', { required: 'Тип обязателен' })}
            >
              <option value='' disabled hidden></option>
              <option value='Квартира'>Квартира</option>
              <option value='Дом'>Дом</option>
              <option value='Коттедж'>Коттедж</option>
              <option value='Таунхаус'>Таунхаус</option>
              <option value='Комната'>Комната</option>
            </Select>
            <FormErrorMessage>
              {realEstateErrors.propertyType?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!realEstateErrors.area}>
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
              {realEstateErrors.area?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!realEstateErrors.rooms}>
            <FormLabel>Количество комнат</FormLabel>
            <Input
              type='number'
              {...register('rooms', {
                required: 'Количество комнат обязательно',
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {realEstateErrors.rooms?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!realEstateErrors.price}>
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
              {realEstateErrors.price?.message?.toString()}
            </FormErrorMessage>
          </FormControl>
        </>
      )}

      {type === CATEGORIES.AUTO && (
        <>
          <FormControl isInvalid={!!autoErrors.brand}>
            <FormLabel>Марка</FormLabel>
            <Select
              defaultValue=''
              {...register('brand', { required: 'Марка обязательна' })}
            >
              <option value='' disabled hidden></option>
              <option value='Toyota'>Toyota</option>
              <option value='BMW'>BMW</option>
              <option value='Mercedes'>Mercedes</option>
              <option value='Audi'>Audi</option>
              <option value='Ford'>Ford</option>
              <option value='Honda'>Honda</option>
            </Select>
            <FormErrorMessage>
              {autoErrors.brand?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!autoErrors.model}>
            <FormLabel>Модель</FormLabel>
            <Input {...register('model', { required: 'Модель обязательна' })} />
            <FormErrorMessage>
              {autoErrors.model?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!autoErrors.year}>
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
              {autoErrors.year?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!autoErrors.mileage}>
            <FormLabel>Пробег </FormLabel>
            <Input
              type='number'
              {...register('mileage', {
                required: 'Пробег обязателен',
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {autoErrors.mileage?.message?.toString()}
            </FormErrorMessage>
          </FormControl>
        </>
      )}

      {type === CATEGORIES.SERVICES && (
        <>
          <FormControl isInvalid={!!serviceErrors.serviceType}>
            <FormLabel>Тип услуги</FormLabel>
            <Select
              defaultValue=''
              {...register('serviceType', {
                required: 'Тип услуги обязателен',
              })}
            >
              <option value='' disabled hidden></option>
              <option value='Ремонт'>Ремонт</option>
              <option value='Уборка'>Уборка</option>
              <option value='Доставка'>Доставка</option>
              <option value='Репетиторство'>Репетиторство</option>
              <option value='Консультации'>Консультации</option>
            </Select>
            <FormErrorMessage>
              {serviceErrors.serviceType?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!serviceErrors.experience}>
            <FormLabel>Опыт работы</FormLabel>
            <Input
              type='number'
              {...register('experience', {
                required: 'Опыт обязателен',
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {serviceErrors.experience?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!serviceErrors.cost}>
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
              {serviceErrors.cost?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>График работы</FormLabel>
            <Input {...register('workSchedule')} />
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
