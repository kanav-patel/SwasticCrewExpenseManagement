// src/models/Approval.js

import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Approval = sequelize.define('Approval', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
    defaultValue: 'Pending',
    allowNull: false,
  },
  // This will store the order in a multi-level approval chain
  sequence: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  comment: {
    type: DataTypes.TEXT,
  },
});

export default Approval;