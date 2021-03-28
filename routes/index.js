const express = require('express');
const app = express();
const { upload } = require('../middleware/upload');
const productUpload = upload('products').fields([{ name: 'image' }]);
const categoryController = require('../controllers/category');
const Controller = require('../controllers/');

app.post('/category', categoryController.createCategoryController);
app.get('/category', categoryController.getCategoryController);
app.patch('/category/:id', categoryController.updateCategoryController);
app.delete('/category/:id', categoryController.deleteCategoryController);

app.post('/product', categoryController.createCategoryController);
app.get('/product', categoryController.getCategoryController);
app.patch('/product/:id', categoryController.updateCategoryController);
app.delete('/product/:id', categoryController.deleteCategoryController);
