import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ROUTES from '../../const/routes.ts';

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      [ROUTES.FORM]: 'Создание объявления',
      [ROUTES.LIST]: 'Список объявлений',
      [ROUTES.ITEM]: 'Детали объявления',
    };

    document.title = titles[location.pathname] || 'Мой сайт';
  }, [location.pathname]);

  return null;
};

export default TitleUpdater;
