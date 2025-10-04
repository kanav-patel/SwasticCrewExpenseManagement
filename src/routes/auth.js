// src/routes/auth.js

import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Route: POST /api/auth/signup
router.post('/signup', signup);

// Route: POST /api/auth/login
router.post('/login', login);

export default router;