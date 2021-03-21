const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'guest_orders_item',
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
      tableName: 'guest_orders_item',
    },
  );
  Model.associate = function (models) {
    this.belongsTo(models.guest_orders, {
      foreignKey: 'order_id',
      sourceKey: 'id',
    });
  };

  return Model;
};
