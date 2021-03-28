const { subscribed_item, products } = require('../models');
const { too, ReS, ReE } = require('./util');

export const createSubscribedItem = async (req, res) => {
  try {
    const [err, data] = await too(subscribed_item.create(req.body));
    if (err) return ReE(res, err, status_codes_msg.INVALID_ENTITY.code);
    if (data) return data;
  } catch (error) {
    TE(error.message);
  }
};

export const getSubscribedItem = async (req, res) => {
  let page, limit;
  page = parseInt(param['page']);
  limit = parseInt(param['limit']);
  if (!page) page = 1;
  if (!limit) limit = 20;
  const query = omit(param, ['page', 'limit']);
  try {
    const [err, allModules] = await too(
      subscribed_item.findAndCountAll({
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

export const updateSubscribedItem = async (param, id) => {
  try {
    const [err, data] = await too(
      subscribed_item.update(param, { where: { id: id } }),
    );
    if (err) TE(err.message);
    if (!data) TE('SOMETHING WENT WRONG WHILE UPDATING');
    return data;
  } catch (error) {
    TE(error.message);
  }
};

export const deleteSubscribedItem = async (param, id) => {
  try {
    const [err, data] = await too(
      subscribed_item.destroy({ where: { id: id } }),
    );
    if (err) TE(err.message);
    if (!data) TE('SOMETHING WENT WRONG WHILE DELETING');
    return data;
  } catch (error) {
    TE(error.message);
  }
};
