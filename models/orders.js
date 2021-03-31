const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'orders',
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
      shipping_charge: {
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
      shipping_date: {
        type: DataTypes.DATE,
      },
      completed_date: {
        type: DataTypes.DATE,
      },
      cancelled_date: {
        type: DataTypes.DATE,
      },
      payment_date: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'PENDING',
        validate: {
          isIn: {
            args: [['PENDING', 'ACTIVE', 'CANCELLED', 'SHIPPING', 'COMPLETED']],
            msg:
              'Status must be PENDING, ACTIVE,CANCELLED,SHIPPING OR COMPLETED',
          },
        },
      },

      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      tableName: 'orders',
    },
  );

  Model.associate = function (models) {
    this.belongsTo(models.users, { foreignKey: 'user_id', targetKey: 'id' });
    this.hasMany(models.orders_item, { foreignKey: 'order_id', sourceKey: 'id' });
  };

  
  return Model;
};
