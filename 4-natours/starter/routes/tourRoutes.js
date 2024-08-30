const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

// Cerate a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

//The code below use get is good but when we want to update v1 to v2 it hard
//So now Let use route instead of get :
router // get(getAllTours) = the current, post(createTour) = the update
  .route('/')
  .get(authController.protect, tourController.getAllTours) //this middleware function is gonna run first and again, if the user is not authenticated then there will be an error.
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    //This devide the admin & users
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;
