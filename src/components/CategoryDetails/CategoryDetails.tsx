import { Box, Text } from '@chakra-ui/react';
import { Post } from '../../model/posts.ts';

interface CategoryDetailsProps {
  data: Post;
}

const CategoryDetails = ({ data }: CategoryDetailsProps) => {
  if (!data?.type) return null;

  let fields: { label: string; value: string | number | null }[] = [];

  switch (data.type) {
    case 'Недвижимость':
      fields = [
        { label: 'Тип недвижимости', value: data.propertyType },
        { label: 'Площадь', value: data.area ? `${data.area} м²` : null },
        { label: 'Количество комнат', value: data.rooms },
        { label: 'Цена', value: data.price ? `${data.price} ₽` : null },
      ];
      break;

    case 'Авто':
      fields = [
        { label: 'Марка', value: data.brand },
        { label: 'Модель', value: data.model },
        { label: 'Год выпуска', value: data.year },
        { label: 'Пробег', value: data.mileage ? `${data.mileage} км` : null },
      ];
      break;

    case 'Услуги':
      fields = [
        { label: 'Тип услуги', value: data.serviceType },
        {
          label: 'Опыт работы',
          value: data.experience ? `${data.experience} лет` : null,
        },
        { label: 'Стоимость', value: data.cost ? `${data.cost} ₽` : null },
        { label: 'График работы', value: data.workSchedule ?? null },
      ];
      break;

    default:
      return null;
  }

  return (
    <Box mt={4}>
      {fields.map(({ label, value }) =>
        value ? (
          <Text key={label}>
            {label}: {value}
          </Text>
        ) : null,
      )}
    </Box>
  );
};

export default CategoryDetails;
