const express = require('express');
const userContoller = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//REQUIRE PROTECTION FOR ALL ROUTES DECLARED AFTER THE MIDDLEWARE
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.get(
  '/me',

  userContoller.getMe,
  userContoller.getUser,
);
router.patch(
  '/updateMe',
  userContoller.uploadUserPhoto,
  userContoller.resizeUserPhoto,
  userContoller.updateMe,
);
router.delete('/deleteMe', userContoller.deleteMe);

//RESTRICTED OT ADMIN ONLY MIDDLEWARE
router.use(authController.restrictTo('admin'));

router.route('/').get(userContoller.getAllUsers).post(userContoller.createUser);

router
  .route('/:id')
  .get(userContoller.getUser)
  .patch(userContoller.updateUser)
  .delete(userContoller.deleteUser);

module.exports = router;
