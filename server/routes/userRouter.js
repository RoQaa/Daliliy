const express=require('express');
const router = express.Router();
const authController=require(`${__dirname}/../controllers/authController`)
const userController=require(`${__dirname}/../controllers/userController`)

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
router.get('/profilePage',userController.profilePage)
router.delete('/deleteAccount',userController.deleteAccount)


//Just Admin routes
router.patch('/updateUser/:id',authController.restrictTo('admin'),userController.updateUserByAdmin)
router.delete('/deleteUser/:id',authController.restrictTo('admin'),userController.deleteUser)
router.post('/createAccount',authController.restrictTo('admin'),userController.creataAccount)
// Restrict all routes after this middleware
router.use(authController.restrictTo('admin','manger'));

//Admin Routes

router.get('/getUsers',userController.getUsers)
router.get('/getUsers/:id',userController.getUsers)

//router.patch('/updateUser/:id',userController.uploadUserPhoto,userController.resizeUserPhoto,userController.updateUser)

router.get('/search',userController.search)





module.exports=router;

