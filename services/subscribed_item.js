const { subscribed_item, products, users } = require("../models");
const { too, ReS, ReE, TE, paginate } = require("./util");

const omit = require("lodash/omit");

export const createSubscribedItem = async (param) => {
  try {
    const [err, data] = await too(subscribed_item.create(param));
    if (err) TE(err.message);
    if (data) return data;
  } catch (error) {
    TE(error.message);
  }
};

export const getSubscribedItem = async (param) => {
  let page, limit;
  page = parseInt(param["page"]);
  limit = parseInt(param["limit"]);
  if (!page) page = 1;
  if (!limit) limit = 20;
  const query = omit(param, ["page", "limit"]);
  try {
    const [err, allModules] = await too(
      subscribed_item.findAndCountAll({
        where: Object.keys(query).length > 0 ? query : "",
        ...paginate(page, limit),
        include: [
          { model: products },
          { model: users, attributes: ["id", "fullName", "username", "email"] },
        ],
      })
    );
    if (err) TE(err.message);
    if (!allModules) TE("SOMETHING WENT WRONG WHILE FETCHING");
    return allModules;
  } catch (error) {
    TE(error.message);
  }
};

export const updateSubscribedItem = async (param, id) => {
  try {
    const [err, data] = await too(
      subscribed_item.update(param, { where: { id: id } })
    );
    if (err) TE(err.message);
    if (!data) TE("SOMETHING WENT WRONG WHILE UPDATING");
    const [err1, data1] = await too(subscribed_item.findOne({ where: { id: id } }));
    if (err1) TE(err1.message);
    if (!data1) TE('SOMETHING WENT WRONG WHILE FETCHING');
    return data1;
  } catch (error) {
    TE(error.message);
  }
};

export const deleteSubscribedItem = async (id) => {
  try {
    const [err, data] = await too(
      subscribed_item.destroy({ where: { id: id } })
    );
    if (err) TE(err.message);
    if (!data) TE("SOMETHING WENT WRONG WHILE DELETING");
    return data;
  } catch (error) {
    TE(error.message);
  }
};
