import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();


router.post('/register', upload.single('photo'), register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.put('/editProfile/:id', authMiddleware,  upload.single('photo'), updateProfile);

export default router;