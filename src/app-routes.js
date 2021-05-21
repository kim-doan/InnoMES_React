import { withNavigationWatcher } from './contexts/navigation';
import { HomePage } from './pages';
import MasterProduct from './pages/Master/MasterProduct/MasterProduct';
import MasterManufactureProcess from './pages/Master/MasterManufactureProcess/MasterManufactureProcess';

const routes = [
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/master/product',
    component: MasterProduct
  },
  {
    path: '/master/manufactureProcess',
    component: MasterManufactureProcess
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
