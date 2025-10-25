'use strict';
const {
  DataTypes
} = require('sequelize');
const sequelize = require('../../config/database');
const bcrypt = require('bcrypt');
const AppError = require('../../utils/appError');
const task = require('./task');

const user = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'User name cannot be null',
      },
      notEmpty: {
        msg: 'User name cannot be null',
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Email cannot be null',
      },
      notEmpty: {
        msg: 'Email cannot be null',
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Password cannot be null',
      },
      notEmpty: {
        msg: 'Password cannot be null',
      }
    }
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value) {
      if( value === this.password ) {
        const hashPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashPassword);
      } else {
        throw new AppError(
          'Password and confirm password must be the same',
          400
        )
      }
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  }
},
{
  paranoid: true,
  freezeTableName: true,
  modelName: 'user',
})

user.hasMany(task, { foreignKey: 'createdBy' });
task.belongsTo(user, { foreignKey: 'createdBy' });

module.exports = user;