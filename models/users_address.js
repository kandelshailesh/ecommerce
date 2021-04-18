const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'address',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      shipping: {
        type: DataTypes.STRING(255),
      },
      billing: {
        type: DataTypes.STRING(255),
      },
    },
    {
      paranoid: true,
      tableName: 'address',
    },
  );

  Model.associate = function (model) {};
  return Model;
};
