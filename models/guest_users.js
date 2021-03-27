/* jshint indent: 2 */
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const { TE, too } = require('../utils');
const randtoken = require('rand-token');
const SequelizeSlugify = require('sequelize-slugify');

module.exports = function (sequelize, DataTypes) {
  var Model = sequelize.define(
    'guest_users',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
      },
    },
    {
      paranoid: true,
      tableName: 'guest_users',
    },
  );
  return Model;
};
