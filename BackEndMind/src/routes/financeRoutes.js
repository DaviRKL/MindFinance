const express = require('express');
const { createFinance, getFinances, updateFinance, deleteFinance } = require('../controllers/financeController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createFinance);
router.get('/', authMiddleware, getFinances);
router.put('/:id', authMiddleware, updateFinance);
router.delete('/:id', authMiddleware, deleteFinance);

module.exports = router;
