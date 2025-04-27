import { Router } from 'express';
import {
  getUserById, getUsers, updateProfile, updateAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;
