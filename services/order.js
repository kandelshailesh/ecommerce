const {
  category,
  products,
  orders,
  guest_orders,
  orders_item,
  guest_orders_item,
} = require('../models');
const { too, ReS, ReE, TE, paginate } = require('./util');

const omit = require('lodash/omit');

export const createOrder = async param => {
  try {
    let err, data, err2, data2, err1, data1;
    const result = () =>
      Promise.all(
        param['order_item'].map((item, i) => ({
          ...item,
          order_id: data1.id,
        })),
      );
    [err1, data1] = await too(
      orders.findByOne({
        where: { user_id: param['user_id'], status: 'pending' },
      }),
    );
    if (err1) TE(err1.message);
    if (!data1) {
      [err, data] = await too(orders.create(param));
      if (err) return TE(err.message);
      [err2, data2] = await too(orders_item.bulkCreate(result()));
    } else {
      const [err3, data3] = await too(
        orders_item.destroy({
          where: { id: param['deleted_item'] ? param['deleted_item'] : '' },
        }),
      );
      if (err3) TE('Error in deleteing order item');
      [err2, data2] = await too(orders_item.bulkCreate(result()), {
        updateOnDuplicate: ['id'],
      });
    }
  } catch (error) {
    TE(error.message);
  }
};

export const getOrder = async param => {
  let page, limit;
  page = parseInt(param['page']);
  limit = parseInt(param['limit']);
  if (!page) page = 1;
  if (!limit) limit = 20;
  const query = omit(param, ['page', 'limit']);
  try {
    const [err, allModules] = await too(
      orders.findAndCountAll({
        where: Object.keys(query).length > 0 ? query : '',
        ...paginate(page, limit),
        // include: [
        //   param['order_item'] === 'true'
        //     ? { model: orders_item, include: [{ model: products }] }
        //     : '',
        // ],
      }),
    );
    if (err) TE(err.message);
    if (!allModules) TE('SOMETHING WENT WRONG WHILE FETCHING');
    return allModules;
  } catch (error) {
    TE(error.message);
  }
};

export const updateOrder = async (param, id) => {
  try {
    const [err, data] = await too(
      orders.findOne(param, {
        where: { id: id },
      }),
    );
    if (err) TE(err.message);
    if (!data) TE('Order ID not found');
    if (param['status']) {
      if (param['status'] !== data.status) {
        'PENDING', 'ACTIVE', 'CANCELLED', 'SHIPPING', 'COMPLETED';
        switch (param['status']) {
          case 'PENDING':
            param['status'] = 'PENDING';
            param['ordered_date'] = moment();
            break;
          case 'ACTIVE':
            param['status'] = 'ACTIVE';
            param['requested_date'] = moment();
            break;
          case 'CANCELLED':
            param['status'] = 'CANCELLED';
            param['cancelled_date'] = moment();
            break;
          case 'SHIPPING':
            param['status'] = 'SHIPPING';
            param['shipping_date'] = moment();
            break;
          case 'COMPLETED':
            param['status'] = 'COMPLETED';
            param['completed_date'] = moment();
            param['paid_amount'] = orders.total_amount;
            break;
        }
      }
    }

    return await data.save();
  } catch (error) {
    TE(error.message);
  }
};

export const deleteOrder = async id => {
  try {
    const [err, data] = await too(
      orders.destroy({
        where: { id: id },
      }),
    );
    if (err) TE(err.message);
    if (!data) TE('Order ID not found');
    if (data) return data;
  } catch (error) {
    TE(error.message);
  }
};
