const express=require('express');
const router = express.Router();
const authController=require('../controllers/authController')
const reviewController=require('../controllers/reviewController')

router.use(authController.protect)

router.get('/getReviews',reviewController.getReviews)
router.post('/addReview',reviewController.addReviews)



module.exports=router;