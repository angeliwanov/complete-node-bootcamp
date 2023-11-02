const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

//both routes are handled in router.post
//POST /tour/32343/reviews
//POST /reviews

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview,
  );

router
  .route('/:id')
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.deleteReview,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.updateReview,
  );

module.exports = router;
