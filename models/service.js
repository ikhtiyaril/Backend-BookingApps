const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Service = sequelize.define('Service', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    features:{
      type: DataTypes.JSON,
      allowNull:false
    }
  });

  Service.hasMany(sequelize.models.Booking, {
    foreignKey: 'service_id',
    as: 'bookings',
  });

  return Service;
};
