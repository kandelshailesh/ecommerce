const { category, products } = require('../models');
const { too, ReS, ReE, TE, paginate } = require('./util');

const omit = require('lodash/omit');

export const createCategory = async param => {
  try {
    const [err, data] = await too(
      category.findOne({ where: { name: param['name'] } }),
    );
    if (err) return TE(err.message);
    if (data) return TE('Name already exists');
    const [err1, data1] = await too(category.create(param));
    if (err1) return TE(err1.message);
    if (data1) return data1;
  } catch (error) {
    TE(error.message);
  }
};

export const getCategory = async param => {
  let page, limit;
  page = parseInt(param['page']);
  limit = parseInt(param['limit']);
  if (!page) page = 1;
  if (!limit) limit = 20;
  const query = omit(param, ['page', 'limit', 'product']);
  try {
    const [err, allModules] = await too(
      category.findAndCountAll({
        where: Object.keys(query).length > 0 ? query : '',
        ...paginate(page, limit),
        include: param['product'] === 'true' ? [{ model: products }] : [],
      }),
    );
    if (err) TE(err.message);
    if (!allModules) TE('SOMETHING WENT WRONG WHILE FETCHING');
    return allModules;
  } catch (error) {
    TE(error.message);
  }
};

export const updateCategory = async (param, id) => {
  try {
    const [err, data] = await too(
      category.update(param, { where: { id: id } }),
    );
    if (err) TE(err.message);
    if (!data) TE('SOMETHING WENT WRONG WHILE UPDATING');
    const [err1, data1] = await too(category.findOne({ where: { id: id } }));
    if (err1) TE(err1.message);
    if (!data1) TE('SOMETHING WENT WRONG WHILE FETCHING');
    return data1;
  } catch (error) {
    TE(error.message);
  }
};

export const deleteCategory = async id => {
  try {
    const [err, data] = await too(category.destroy({ where: { id: id } }));
    if (err) TE(err.message);
    if (!data) TE('SOMETHING WENT WRONG WHILE DELETING');
    return data;
  } catch (error) {
    TE(error.message);
  }
};
