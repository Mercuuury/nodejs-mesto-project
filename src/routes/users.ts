import { Router } from 'express';
import {
  getUserById, getUsers, updateProfile, updateAvatar, getProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/me', getProfile);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
router.get('/:userId', getUserById);

export default router;
