// src/routes/expenses.js

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createExpense, getExpenses, getTeamExpenses, updateExpenseStatus } from '../controllers/expenseController.js';

const router = express.Router();

// Manager routes
router.get('/team', authMiddleware, getTeamExpenses);
router.put('/:id/status', authMiddleware, updateExpenseStatus);

// Employee routes
router.post('/', authMiddleware, createExpense);
router.get('/', authMiddleware, getExpenses);

export default router;