const express=require('express');
const router = express.Router();
const authController=require('../controllers/authController')
const categoryController=require('../controllers/categoryController')



// Protect all routes after this middleware
router.use(authController.protect)

router.get('/getCats',categoryController.getCategories)



// Restrict all routes after this middleware
router.use(authController.restrictTo('admin'));

router.post('/addCat',categoryController.addCategory)






module.exports=router;