import { Router } from 'express';
import {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
} from '../controllers/clientController';

const router = Router();

router.get('/', index);
router.get('/create', create);
router.post('/create', store);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);
router.get('/:id/edit', edit);

export default router;
