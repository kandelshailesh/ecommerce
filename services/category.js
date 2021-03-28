const { category, products } = require('../models');
const { too, ReS, ReE } = require('./util');

export const createCategory = async param => {
  try {
    const [err, data] = await too(category.create(param));
    if (err) return TE(err.message);
    if (data) return data;
  } catch (error) {
    return ReE(res, err, status_codes_msg.INVALID_ENTITY.code);
  }
};

export const getCategory = async param => {
  let page, limit;
  page = parseInt(param['page']);
  limit = parseInt(param['limit']);
  if (!page) page = 1;
  if (!limit) limit = 20;
  const query = omit(param, ['page', 'limit']);
  try {
    const [err, allModules] = await too(
      category.findAndCountAll({
        where: Object.keys(query).length > 0 ? query : '',
        ...paginate(page, limit),
        include: [param['product'] === 'true' ? { model: products } : ''],
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
    return data;
  } catch (error) {
    TE(error.message);
  }
};

export const deleteCategory = async (param, id) => {
  try {
    const [err, data] = await too(category.destroy({ where: { id: id } }));
    if (err) TE(err.message);
    if (!data) TE('SOMETHING WENT WRONG WHILE DELETING');
    return data;
  } catch (error) {
    TE(error.message);
  }
};
