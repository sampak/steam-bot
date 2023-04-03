import express from 'express';
import inventoryRoute from './inventory.route';
import authM2M from '../middlewares/authM2M';
const router = express.Router();

const routes = [
  {
  path: '/inventory',
  route: inventoryRoute
  }
]

router.use('/*', authM2M)

routes.forEach(route => {
  router.use(route.path, route.route)
})


export default router;