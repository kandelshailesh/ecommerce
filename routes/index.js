const express = require('express');
const app = express();
const { upload } = require('../middlewares/upload');
const passport = require('passport');
require('../middlewares/passport')(passport);
const productUpload = upload('products').fields([{ name: 'image' }]);
const doctorUpload = upload('doctors').fields([{ name: 'image' }]);
const userUpload = upload('users').fields([{ name: 'image' }]);
const orderUpload = upload('orders').fields([{ name: 'image' }]);
const categoryController = require('../controllers/category');
const productController = require('../controllers/products');
const unitController = require('../controllers/unit');
const doctorController = require('../controllers/doctors');
const userAddressController = require('../controllers/user_address');
const orderController = require('../controllers/orders');
const userController = require('../controllers/user');
const subscriberController = require('../controllers/subscribed_item');

const {} = require('../controllers/index');

app.post('/users', userUpload, userController.createUser);
app.post('/user/login', userController.Login);
app.get('/users', userController.fetchUsers);
// app.get('/users',passport.authenticate('jwt', { session: false }), userController.fetchUsers);
app.get('/users/:id', userController.fetchUserByID);
app.patch('/users/:id',userUpload, userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

app.post('/category', categoryController.createCategoryController);
app.get('/category', categoryController.getCategoryController);
app.patch('/category/:id', categoryController.updateCategoryController);
app.delete('/category/:id', categoryController.deleteCategoryController);

app.post('/products', productUpload, productController.createProductController);
app.get('/products', productController.getProductController);
app.patch(
  '/products/:id',
  productUpload,
  productController.updateProductController,
);
app.delete('/products/:id', productController.deleteProductController);

app.post('/unit', unitController.createUnitController);
app.get('/unit', unitController.getUnitController);
app.patch('/unit/:id', unitController.updateUnitController);
app.delete('/unit/:id', unitController.deleteUnitController);

app.post('/doctors', doctorUpload, doctorController.createDoctorController);
app.get('/doctors', doctorController.getDoctorController);
app.patch('/doctors/:id', doctorUpload, doctorController.updateDoctorController);
app.delete('/doctor/:id', doctorController.deleteDoctorController);

app.post('/users/address', userAddressController.createUserAddressController);
app.get('/users/address', userAddressController.getUserAddressController);
app.patch(
  '/users/address/:id',
  userAddressController.updateUserAddressController,
);
app.delete(
  '/users/addresssss/:id',
  userAddressController.deleteUserAddressController,
);

app.post('/orders',orderUpload, orderController.createOrderController);
app.get('/orders', orderController.getOrderController);
app.patch('/orders/:id',orderUpload, orderController.updateOrderController);
app.delete('/orders/:id', orderController.deleteOrderController);

app.post('/subscriber', subscriberController.createSubscriber);
app.get('/subscriber', subscriberController.getSubscriber);
app.patch('/subscriber/:id',subscriberController.updateSubscriber);
app.delete('/subscriber/:id', subscriberController.deleteSubscriber);

 

module.exports = app;
