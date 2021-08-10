'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate ({ User }) {
      RefreshToken.belongsTo(User, {
        foreignKey: 'userId'
      })
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
          onDelete: 'cascade'
        },
        validate: {
          isNull: false
        }
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isNull: false
        }
      },
      ua: {
        type: DataTypes.STRING
      },
      fingerprint: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'RefreshToken',
      tableName: 'refresh_tokens'
    }
  )
  return RefreshToken
}
