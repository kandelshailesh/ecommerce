const { v4: uuidv4 } = require('uuid');

module.exports = function (sequelize, DataTypes) {
  let Model = sequelize.define(
    'patient_payment',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      date_of_appointment: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      hospital_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      patient_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
      },
      amount: {
        type: DataTypes.DOUBLE(11),
      },
      requested_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paid_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(255),
      },
      cancelled_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_reminder_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'patient_payment',
    },
  );

  Model.beforeCreate(user => (user.id = uuidv4()));

  return Model;
};
