const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Booking', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    whatsapp: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Services',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled','complete'),
      defaultValue: 'pending'
    }
  });
  Booking.belongsTo(sequelize.models.Service, {
    foreignKey: 'Service_id',
    as: 'Service', // Ini nama relasi yang bisa lo pakai buat akses relasi di query
  });

  return Booking;
};
