const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'user_address',
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
      },
      country: {
        type: DataTypes.STRING(255),
        defaultValue: 'Nepal',
      },
      state: {
        type: DataTypes.STRING(255),
      },
      city: {
        type: DataTypes.STRING(255),
      },
      address: {
        type: DataTypes.STRING(255),
      },
    },
    {
      paranoid: true,
      tableName: 'user_address',
    },
  );

  return Model;
};
