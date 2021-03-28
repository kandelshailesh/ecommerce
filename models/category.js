const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'category',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // image: {
      //   type: DataTypes.TEXT,
      //   allowNull: true,
      // },
      status: {
        type: DataTypes.ENUM,
        values: ['active', 'hold'],
        default: 'active',
      },
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
      },
    },
    {
      paranoid: true,
      tableName: 'category',
    },
  );

  SequelizeSlugify.slugifyModel(Model, {
    source: ['name'],
  });
  Model.associate = function (models) {
    this.hasMany(models.products, {
      foreignKey: 'id',
      targetKey: 'category_id',
    });
  };
  return Model;
};
