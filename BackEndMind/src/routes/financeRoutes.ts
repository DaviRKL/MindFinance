import { Router } from 'express';
import { createFinance, getFinances, updateFinance, deleteFinance } from '../controllers/financeController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createFinance);
router.get('/', authMiddleware, getFinances);
router.put('/:id', authMiddleware, updateFinance);
router.delete('/:id', authMiddleware, deleteFinance);

export default router;
