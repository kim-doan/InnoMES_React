import { withNavigationWatcher } from './contexts/navigation';
import { HomePage } from './pages';
import MasterProduct from './pages/Master/MasterProduct/MasterProduct';
import PurchaseOrder from './pages/Purchase/PurchaseOrder/PurchaseOrder';

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
    path: '/purchase/purchaseOrder',
    component: PurchaseOrder
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
