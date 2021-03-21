const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'guest_orders',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        unique: true,
      },
      gross_amount: {
        type: DataTypes.DOUBLE(11),
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.DOUBLE(11),
        defaultValue: 0,
      },
      total_amount: {
        type: DataTypes.DOUBLE(11),
        defaultValue: 0,
      },
      total_quantity: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
      },
      ordered_date: {
        type: DataTypes.DATE,
      },
    },
    {
      paranoid: true,
      tableName: 'guest_orders',
    },
  );

  Model.associate = function (models) {
    this.belongsTo(models.guest_users, {
      foreignKey: 'user_id',
      targetKey: 'user_id',
    });
  };

  return Model;
};
