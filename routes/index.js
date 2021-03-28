const express = require('express');
const app = express();
const { upload } = require('../middlewares/upload');
const productUpload = upload('products').fields([{ name: 'image' }]);
const doctorUpload = upload('doctors').fields([{ name: 'image' }]);
const userUpload = upload('doctors').fields([{ name: 'image' }]);

const categoryController = require('../controllers/category');
const productController = require('../controllers/products');
const unitController = require('../controllers/unit');
const doctorController = require('../controllers/doctors');
const userAddressController = require('../controllers/user_address');
const orderController = require('../controllers/orders');
const userController = require('../controllers/user');

const {} = require('../controllers/index');

app.post('/user/signup', userUpload, userController.createUser);
app.post('/user/login', userController.Login);
app.get('/users', userController.fetchUsers);
app.get('/user/:id', userController.fetchUserByID);
app.patch('/user/:id', userController.updateUser);
app.delete('/user/:id', userController.deleteUser);

app.post('/category', categoryController.createCategoryController);
app.get('/category', categoryController.getCategoryController);
app.patch('/category/:id', categoryController.updateCategoryController);
app.delete('/category/:id', categoryController.deleteCategoryController);

app.post('/product', productUpload, productController.createProductController);
app.get('/product', productController.getProductController);
app.patch(
  '/product/:id',
  productUpload,
  productController.updateProductController,
);
app.delete('/product/:id', productController.deleteProductController);

app.post('/unit', unitController.createUnitController);
app.get('/unit', unitController.getUnitController);
app.patch('/unit/:id', unitController.updateUnitController);
app.delete('/unit/:id', unitController.deleteUnitController);

app.post('/doctor', doctorUpload, doctorController.createDoctorController);
app.get('/doctor', doctorController.getDoctorController);
app.patch('/doctor/:id', doctorUpload, doctorController.updateDoctorController);
app.delete('/doctor/:id', doctorController.deleteDoctorController);

app.post('/user', userAddressController.createUserAddressController);
app.get('/user/address', userAddressController.getUserAddressController);
app.patch(
  '/user/address/:id',
  userAddressController.updateUserAddressController,
);
app.delete(
  '/user/addresssss/:id',
  userAddressController.deleteUserAddressController,
);

app.post('/order', orderController.createOrderController);
app.get('/order', orderController.getOrderController);
app.patch('/order/:id', orderController.updateOrderController);
app.delete('/order/:id', orderController.deleteOrderController);

module.exports = app;
