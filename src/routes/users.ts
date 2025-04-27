import { Router } from 'express';
import {
  getProfile,
  getUserById, getUsers,
  updateAvatar,
  updateProfile,
} from '../controllers/users';
import { validateRequest } from '../middlewares';
import { updateAvatarSchema, updateProfileSchema, userIdParamsSchema } from '../schemas/user';

const router = Router();

router.get('/', getUsers);
router.get('/me', getProfile);
router.patch('/me', validateRequest({ body: updateProfileSchema }), updateProfile);
router.patch('/me/avatar', validateRequest({ body: updateAvatarSchema }), updateAvatar);
router.get('/:userId', validateRequest({ params: userIdParamsSchema }), getUserById);

export default router;
