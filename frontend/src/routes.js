
import CreateWallet from './components/create-wallet/CreateWallet';
import History from './components/history/History';
import NotFound from './components/NotFound';


const routes = [
  {
    path: '/history',
    exact: true,
    auth: true,
    component: History,
  },
  {
    path: '/create-wallet',
    exact: true,
    component: CreateWallet
  },
  {
    component: NotFound
  }
]

export default routes;
