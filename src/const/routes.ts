export const ROUTES = {
  FORM: '/form',
  LIST: '/list',
  ITEM: (id: string | number) => `/item/${id}`,
  ITEM_EDIT: (id: string | number) => `/form/${id}`,
  NOT_FOUND: '*',
};

export default ROUTES;
