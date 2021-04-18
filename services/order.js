// import users from '../models/users';

const {
  category,
  products,
  orders,
  guest_orders,
  orders_item,
  users,
  address,
  guest_orders_item,
} = require('../models');
const { too, ReS, ReE, TE, paginate } = require('./util');
const moment = require('moment');
const omit = require('lodash/omit');
const { Op } = require('sequelize');

export const createOrder = async param => {
  try {
    let err, data, err2, data2, err1, err4, data4, data1;

    console.log("Order param",param);

    [err1, data1] = await too(
      orders.findOne({
        where: { user_id: param['user_id'], status: 'PENDING' },
      }),
    );

    const result = orderId =>
      Promise.all(
        param['order_item']?.map((item, i) => ({
          ...item,
          order_id: orderId,
        })),
      );
    console.log('data1', data1);
    if (err1) TE(err1.message);
    if (!data1) {
      param['ordered_date'] = moment();
      [err, data] = await too(orders.create(param));
      console.log('data', data);
      if (err) return TE(err.message);
      [err2, data2] = await too(orders_item.bulkCreate(await result(data.id)));
      console.log('data2', data2);
    } else {
      const [err3, data3] = await too(
        orders_item.destroy({
          where: { id: param['deleted_item'] ? param['deleted_item'] : 0 },
        }),
      );
      console.log('data1lse', data3);
      if (err3) TE('Error in deleteing order item');
      [err4, data4] = await too(
        orders.update(param, {
          where: { id: data1.id },
        }),
      );
      if (err4) TE('Error in while updating image');
      [err2, data2] = await too(
        orders_item.bulkCreate(await result(), {
          updateOnDuplicate: ['product_id', 'quantity'],
          returning: true,
        }),
      );
      if (err2) TE(err2.message);
      console.log('data2 else', data2, await result(data1.id));
    }
    return true;
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
        where: { user_id: param['user_id'], status: 'PENDING' },
        ...paginate(page, limit),
        include: [
          { model: orders_item, include: [{ model: products }] },
          { model: users, attributes: ['id', 'fullName', 'username', 'email'] },
        ],
      }),
    );
    if (err) TE(err.message);
    if (!allModules) TE('SOMETHING WENT WRONG WHILE FETCHING');
    console.log(allModules);
    return allModules;
  } catch (error) {
    TE(error.message);
  }
};

export const getSuccessOrder = async param => {
  let page, limit;
  page = parseInt(param['page']);
  limit = parseInt(param['limit']);
  if (!page) page = 1;
  if (!limit) limit = 20;
  const query = omit(param, ['page', 'limit']);
  try {
    const [err, allModules] = await too(
      orders.findAndCountAll({
        where: {
          user_id: param['user_id'],
          status: { [Op.not]: ['PENDING', 'CANCELLED'] },
        },
        ...paginate(page, limit),
        include: [
          { model: orders_item, include: [{ model: products }] },
          { model: users, attributes: ['id', 'fullName', 'username', 'email'] },
          {
            model: address,
          },
        ],
      }),
    );
    if (err) TE(err.message);
    if (!allModules) TE('SOMETHING WENT WRONG WHILE FETCHING');
    console.log(allModules);
    return allModules;
  } catch (error) {
    TE(error.message);
  }
};

export const updateOrder = async (param, id) => {
  console.log('Create', param);
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

export const checkoutOrder = async param => {
  try {
    param['status'] = 'ACTIVE';
    param['requested_date'] = moment();
    const [err, data] = await too(
      orders.update(param, { where: { id: param['id'] } }),
    );
    if (err) TE(err.message);
    const [err1, data1] = await too(address.create(JSON.parse(param['address'])));
    if (err1) TE(err1.message);
    return data1;
  } catch (err) {
    TE(err.message);
  }
};

export const deleteOrder = async id => {
  try {
    const [err, data] = await too(
      orders.destroy({
        where: { id: id },
      }),
    );
    const [err2, data2] = await too(
      orders_item.destroy({
        where: { order_id: id },
      }),
    );
    if (err) TE(err.message);
    if (err2) TE(err2.message);
    if (!data) TE('Order ID not found');
    if (data) return data;
  } catch (error) {
    TE(error.message);
  }
};
