const express=require('express');
const router = express.Router();
const authController=require('../controllers/authController')
const reviewController=require('../controllers/reviewController')

router.use(authController.protect)

router.get('/getReviews',reviewController.getReviews)
router.post('/addReview',reviewController.addReviews)

router.use(authController.restrictTo('user','admin'))
router.patch('/updateReview',reviewController.updateReview)
router.delete('/deleteReview',reviewController.deleteReview)
module.exports=router;