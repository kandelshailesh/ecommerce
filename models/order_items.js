const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'orders_item',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.STRING(255),
      },
      product_id: {
        type: DataTypes.TEXT,
      },
      quantity: {
        type: DataTypes.INTEGER(11),
      },
      price: {
        type: DataTypes.DOUBLE(11),
      },
    },
    {
      paranoid: true,
      tableName: 'cart_item',
    },
  );

  return Model;
};
