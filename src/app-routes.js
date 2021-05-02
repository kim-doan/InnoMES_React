import { withNavigationWatcher } from './contexts/navigation';
import { HomePage } from './pages';
import MasterProduct from './pages/Master/MasterProduct/MasterProduct';

const routes = [
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/master/product',
    component: MasterProduct
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
