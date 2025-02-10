import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './pages/FormPage.tsx';
import ListPage from './pages/ListPage';
import ItemPage from './pages/ItemPage';
import ROUTES from './const/routes.ts';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.FORM} element={<FormPage />} />
        <Route path={ROUTES.LIST} element={<ListPage />} />
        <Route path={ROUTES.ITEM} element={<ItemPage />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
