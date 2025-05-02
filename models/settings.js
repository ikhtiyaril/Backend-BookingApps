const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Setting', {
    business_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    whatsapp_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    qris_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  });
};
