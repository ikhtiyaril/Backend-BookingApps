const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Setting', {
    business_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'Miracle'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'The Science of Facial Architecture — Designing facial reshaping for your best version.'
    },
    whatsapp_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: `+62 812 3XXX XXXX`
    },
    qris_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'qrish.jpg'
    },
    note:{
      type: DataTypes.STRING(255),
      allowNull:true
    },
    address:{
      type: DataTypes.STRING(255),
      allowNull:true
    },
    email :{
      type: DataTypes.STRING(100),
      allowNull:true,
      defaultValue: 'info@miracle.com'
    },
    slide :{
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: ['BannerBooking1.jpg','BannerBooking2.jpg','BannerBooking3.jpg']
    },
    logo :{
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: 'miracle.jpg'
    }
   

  });
  return Setting
};
