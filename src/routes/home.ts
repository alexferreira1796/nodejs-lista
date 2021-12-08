import { Router } from 'express';
import { index } from '../controllers/homeController';

const route = Router();

route.get('/', index);

export default route;
