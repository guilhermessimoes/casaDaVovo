var express = require('express');
const app = require('../app');
var router = express.Router();
const authController = require('../controllers/authController')





router.get('/signup', authController.signupGet)
router.post('/signup', authController.signupPost)

router.post('/', authController.loginPost)
router.get('/', authController.loginGet)

//router.get('/logout', loginController.viewLogin)







module.exports = router;
