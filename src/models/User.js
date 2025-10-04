// src/models/User.js

import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Manager', 'Employee'),
    defaultValue: 'Employee',
  },
  managerId: { // This column stores the ID of the user's manager
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // This is a reference to another user
      key: 'id',
    },
  },
});

// A Manager (User) can have many Employees (Users)
User.hasMany(User, { as: 'Employees', foreignKey: 'managerId' });
User.belongsTo(User, { as: 'Manager', foreignKey: 'managerId' });

export default User;