/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  let Model = sequelize.define(
    'hospital_bank_details',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      hospital_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      individual_first_name: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      individual_last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      individual_email: {
        type: DataTypes.STRING(255),
      },
      individual_dob: {
        type: DataTypes.DATE,
      },
      individual_street_address: {
        type: DataTypes.STRING(255),
      },
      individual_city: {
        type: DataTypes.STRING(255),
      },
      individual_state: {
        type: DataTypes.STRING(255),
      },
      individual_zipcode: {
        type: DataTypes.STRING(255),
      },
      business_legal_name: {
        type: DataTypes.STRING(255),
      },
      business_tax_id: {
        type: DataTypes.STRING(255),
      },
      business_street_address: {
        type: DataTypes.STRING(255),
      },
      business_city: {
        type: DataTypes.STRING(255),
      },
      business_state: {
        type: DataTypes.STRING(255),
      },
      business_zipcode: {
        type: DataTypes.STRING(255),
      },
      account_no: {
        type: DataTypes.STRING(30),
      },
      routing_number: {
        type: DataTypes.STRING(30),
      },
      status: {
        type: DataTypes.ENUM,
        values: ['active', 'hold'],
      },
    },
    {
      tableName: 'hospital_bank_details',
    },
  );
  return Model;
};

// CREATE TABLE IF NOT EXISTS `hospital_bank_details` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `hospital_id` INTEGER(11) NOT NULL, `individual_first_name` VARCHAR(11) NOT NULL, `individual_last_name` VARCHAR(255) NOT NULL, `individual_email` VARCHAR(255), `individual_dob` DATETIME, `individual_street_address` VARCHAR(255), `individual_city` VARCHAR(255),`individual_state` VARCHAR(255), `individual_zipcode` VARCHAR(255), `business_legal_name` VARCHAR(255), `business_tax_id` VARCHAR(255), `business_street_address` VARCHAR(255), `business_city` VARCHAR(255), `business_state` VARCHAR(255), `business_zipcode` VARCHAR(255), `account_no` VARCHAR(30), `routing_number` VARCHAR(30), `status` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
