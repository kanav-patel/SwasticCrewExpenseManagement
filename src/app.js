// src/app.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './config/db.js';

// Import models to ensure they are registered with Sequelize
import User from './models/User.js';
import Expense from './models/Expense.js';
import Approval from './models/Approval.js';
import ApprovalRule from './models/ApprovalRule.js'; // <-- ADD THIS LINE

// Import routes
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 Swastic Crew Expense Management API is running!');
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`✅ Server is running on port ${PORT}`)
  );
}).catch(err => {
  console.error('❌ Unable to connect to the database:', err);
});