const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'products',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      category_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      unit_price: {
        type: DataTypes.DOUBLE(11),
      },
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      total_quantity: {
        type: DataTypes.INTEGER,
      },
      min_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      max_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      old_price: {
        type: DataTypes.DOUBLE(11),
      },
      discountable: {
        type: DataTypes.BOOLEAN(11),
      },
      discount_type: {
        type: DataTypes.ENUM,
        values: ['%', 'Rs'],
      },
      discount_amount: {
        type: DataTypes.DOUBLE(11),
        defaultValue: 0,
      },
      isSubscribable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      paranoid: true,
      tableName: 'products',
    },
  );

  SequelizeSlugify.slugifyModel(Model, {
    source: ['name'],
  });

  return Model;
};
