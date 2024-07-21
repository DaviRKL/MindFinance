import { Router } from 'express';
import multer from 'multer';
import { register, login, getProfile } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();


router.post('/register', upload.single('photo'), register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

export default router;