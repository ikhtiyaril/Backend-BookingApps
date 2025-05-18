
module.exports = (sequelize, DataTypes) => {
    const Promo = sequelize.define('Promo', {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
      },
      discountPercent: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      validUntil: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    });
  
    return Promo;
  };
  