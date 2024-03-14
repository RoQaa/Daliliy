const express=require('express');
const router = express.Router();
const authController=require('../controllers/authController')
const itemController=require('../controllers/itemController')




// Protect all routes after this middleware
router.use(authController.protect)

router.get('/getItems',itemController.getItems)
router.get('/getSpecificItem',itemController.getSpecificItem)



// Restrict all routes after this middleware
router.use(authController.restrictTo('admin'));

router.post('/addItem',itemController.addItem)






module.exports=router;