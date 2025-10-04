// src/models/Expense.js

import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';
import Approval from './Approval.js'; // <-- Import the new model

const Expense = sequelize.define('Expense', {
  // ... existing columns ...
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  currency: { type: DataTypes.STRING, allowNull: false, defaultValue: 'INR' },
  category: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'), defaultValue: 'Pending' },
});

// An Expense is submitted by one User
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

// An Expense can have many Approvals
Expense.hasMany(Approval, { foreignKey: 'expenseId' });
Approval.belongsTo(Expense, { foreignKey: 'expenseId' });

// An Approval is assigned to one User (the approver)
User.hasMany(Approval, { foreignKey: 'approverId' });
Approval.belongsTo(User, { as: 'Approver', foreignKey: 'approverId' });


export default Expense;