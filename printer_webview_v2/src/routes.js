import MainPage from './components/MainPage';
import TemplatePage from './components/TemplatePage';

const ROUTES = [
  {
    path: '/',
    exact: true,
    component: MainPage,
  },
  {
    path: '/template',
    component: TemplatePage,
  },
];

export default ROUTES;
