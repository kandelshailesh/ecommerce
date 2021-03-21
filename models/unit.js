module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'unit',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      paranoid: true,
      tableName: 'unit',
    },
  );

  return Model;
};
