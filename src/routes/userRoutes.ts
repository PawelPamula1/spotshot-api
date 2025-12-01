import { Router } from 'express';
import { deleteUser, getUserById } from '../controllers/userController';

const router = Router();

router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

export default router;
