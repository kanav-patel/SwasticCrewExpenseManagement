// src/models/ApprovalRule.js

import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const ApprovalRule = sequelize.define('ApprovalRule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rule_type: {
    type: DataTypes.ENUM('percentage', 'specific_approver', 'hybrid'),
    allowNull: false,
  },
  // For 'percentage', value is '60'; for 'specific_approver', value is the user's ID
  rule_value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default ApprovalRule;