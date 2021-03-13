module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'product_unit',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      paranoid: true,
      tableName: 'product_unit',
    },
  );

  Model.associate = function (models) {};
  return Model;
};
