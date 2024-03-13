const express=require('express');
const router = express.Router();
const authController=require('../controllers/authController')


router.post('/signUp', authController.SignUp);
router.post('/login', authController.login);

// Protect all routes after this middleware
router.use(authController.protect)







// Restrict all routes after this middleware
router.use(authController.restrictTo('admin'));
//Admin Routes



module.exports=router;

