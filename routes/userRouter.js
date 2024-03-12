const express=require('express');
const router = express.Router();
const authController=require('../controllers/authController')


router.post('/signUp', authController.SignUp);
router.post('/login', authController.login);
router.get('/data',authController.protect,authController.getUserData)






// Restrict all routes after this middleware
router.use(authController.restrictTo('admin'));
//Admin Routes



module.exports=router;

