//import system_modules from "../../auth_models/system_modules";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from '../services/product';

const { too, ReS, ReE, TE } = require('../services/util');
const { status_codes_msg } = require('../utils/appStatics');

export const createProductController = async (req, res) => {
  const param = req.body;
  if (req.files) {
    param.image = req.files['image'] ? req.files['image'][0].path : null;
  }
  if (!param.status) {
    param.status = 'active';
  }

  console.log(param);
  try {
    const [err, newPackage] = await too(createProduct(param));
    if (err) {
      ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (newPackage) {
      ReS(
        res,
        {
          message: 'NEW PRODUCT ADDED',
          DATA: newPackage,
        },
        status_codes_msg.CREATED.code,
      );
    }
  } catch (error) {
    ReE(res, error.message, status_codes_msg.FAILED.code);
  }
};

export const getProductController = async (req, res) => {
  const param = req.query;
  try {
    const [err, packageByKey] = await too(getProduct(param));

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (packageByKey) {
      return ReS(
        res,
        {
          message: `FETCH SUCCESSFULLY`,
          DATA: packageByKey.rows,
          count: packageByKey.count,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};

export const updateProductController = async (req, res) => {
  const params = req.body;
  const { id } = req.params;
  if (req.files) {
    params.image = req.files['image'] ? req.files['image'][0].path : null;
  }

  try {
    const [err, updatedPackage] = await too(updateProduct(params, id));
    console.log(updatedPackage);

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (updatedPackage) {
      return ReS(
        res,
        {
          message: `DATA UPDATED`,
          DATA: updatedPackage,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};

export const deleteProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const [err, deletedPackage] = await too(deleteProduct(id));

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (deletedPackage) {
      return ReS(
        res,
        {
          message: `PRODUCT DELETED`,
          DATA: deletedPackage,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};
