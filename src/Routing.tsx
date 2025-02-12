import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ROUTES from './const/routes.ts';
import TitleUpdater from './components/TitleUpdater';
import { FormPage, ItemPage, ListPage } from './pages';

const AppRouter = () => {
  return (
    <Router>
      <TitleUpdater />
      <Routes>
        <Route path={ROUTES.FORM} element={<FormPage />} />
        <Route path={ROUTES.LIST} element={<ListPage />} />
        <Route path={ROUTES.ITEM} element={<ItemPage />} />
        <Route path={ROUTES.ITEM_EDIT} element={<FormPage />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
