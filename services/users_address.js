const { users_address, products } = require('../models');
const { too, ReS, ReE } = require('./util');

export const createAddress = async (req, res) => {
  try {
    const [err, data] = await too(users_address.create(req.body));
    if (err) return ReE(res, err, status_codes_msg.INVALID_ENTITY.code);
    if (data)
      return ReS(
        res,
        { message: 'Address added successfully', data: data },
        status_codes_msg.CREATED.code,
      );
  } catch (error) {
    return ReE(res, err, status_codes_msg.INVALID_ENTITY.code);
  }
};

export const getAddress = async (req, res) => {
  let page, limit;
  page = parseInt(param['page']);
  limit = parseInt(param['limit']);
  if (!page) page = 1;
  if (!limit) limit = 20;
  const query = omit(param, ['page', 'limit']);
  try {
    const [err, allModules] = await too(
      users_address.findAndCountAll({
        where: Object.keys(query).length > 0 ? query : '',
        ...paginate(page, limit),
      }),
    );
    if (err) TE(err.message);
    if (!allModules) TE('SOMETHING WENT WRONG WHILE FETCHING');
    return allModules;
  } catch (error) {
    TE(error.message);
  }
};

export const updateAddress = async (param, id) => {
  try {
    const [err, data] = await too(
      users_address.update(param, { where: { id: id } }),
    );
    if (err) TE(err.message);
    if (!data) TE('SOMETHING WENT WRONG WHILE UPDATING');
    return data;
  } catch (error) {
    TE(error.message);
  }
};

export const deleteAddress = async (param, id) => {
  try {
    const [err, data] = await too(users_address.destroy({ where: { id: id } }));
    if (err) TE(err.message);
    if (!data) TE('SOMETHING WENT WRONG WHILE DELETING');
    return data;
  } catch (error) {
    TE(error.message);
  }
};
