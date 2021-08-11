'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate ({ User }) {
      RefreshToken.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  RefreshToken.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        validate: {
          notNull: true,
        },
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      ua: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isNull: true,
        },
      },
      fingerprint: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'RefreshToken',
      tableName: 'refresh_tokens',
    },
  );
  return RefreshToken;
};
