const express=require('express');
const router = express.Router();
const authController=require('../controllers/authController')
const userController=require('../controllers/userController')

router.post('/signUp', authController.SignUp);
router.post('/login', authController.login);
router.post('/forgotPassword',authController.forgotPassword)
router.post('/verifyEmailOtp',authController.verifyEmailOtp)
// Protect all routes after this middleware
router.use(authController.protect)
//Auth Routes
router.patch('/resetPassword',authController.resetPassword)
router.patch('/updatePassword',authController.updatePassword)
router.get('/logout',authController.logOut)

//user Routes
router.patch('/updateUser',userController.uploadUserPhoto,userController.resizeUserPhoto,userController.updateUser)




// Restrict all routes after this middleware
router.use(authController.restrictTo('admin'));
//Admin Routes

router.get('/getUsers',userController.getUsers)
router.get('/getUsers/:id',userController.getUsers)
router.delete('/deleteUser/:id',userController.deleteUser)
router.patch('/updateUser/:id',userController.uploadUserPhoto,userController.resizeUserPhoto,userController.updateUser)
router.patch('/activity/:id',userController.Active)




module.exports=router;

