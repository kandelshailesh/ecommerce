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
        type: DataTypes.INTEGER(11),
        allowNull: false,
        unique: true,
      },
      product_id: {
        type: DataTypes.INTEGER(11),
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
        type: DataTypes.STRING,
        defaultValue: 'active',
        validate: {
          isIn: {
            args: [['active', 'cancelled']],
            msg: 'Status must be active or cancelled',
          },
        },
      },
    },
    {
      paranoid: true,
      tableName: 'subscribed_item',
    },
  );
  Model.associate = function (models) {
    this.belongsTo(models.users, { foreignKey: 'user_id', targetKey: 'id' });
    this.belongsTo(models.products, {
      foreignKey: 'product_id',
      targetKey: 'id',
    });
  };

  return Model;
};
