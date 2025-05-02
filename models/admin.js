const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Admin', {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  });
  return Admin
};
