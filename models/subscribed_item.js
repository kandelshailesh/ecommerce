const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'subscribed_item',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      product_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      subscribed_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_send_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        status: ['active', 'cancelled'],
        defaultValue: 'active',
      },
    },
    {
      paranoid: true,
      tableName: 'subscribed_item',
    },
  );

  return Model;
};
