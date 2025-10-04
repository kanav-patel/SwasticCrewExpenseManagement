// src/app.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './config/db.js';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('🚀 Swastic Crew Expense Management API is running!');
});

// API Routes
app.use('/api/auth', authRoutes);

// Add a script to your package.json: "start": "node src/app.js"
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`✅ Server is running on port ${PORT}`)
  );
}).catch(err => {
  console.error('❌ Unable to connect to the database:', err);
});