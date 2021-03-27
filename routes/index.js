const express = require('express');
const router = express.Router();
const multer = require('multer');

const formupload = multer();
const { upload } = require('../middlewares/upload');
const userProfileUpload = upload('users').fields([{ name: 'profile_image' }]);
// const passport = require('passport');
const UserController = require('../controllers/user');

router.post(
    '/user/register',
    // passport.authenticate('jwt', { session: false }),
    userProfileUpload,
    // Validate.registerUser,
    UserController.createUser,
  );
router.get('/users',UserController.fetchUsers);
router.get('/user/:id',UserController.fetchUserByID);


module.exports=router;


