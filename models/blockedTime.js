const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  return sequelize.define('BlockedTime', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: { 
      type: DataTypes.TIME,
      allowNull: false, 
    },
   
  });
  return BlockedTime
};
