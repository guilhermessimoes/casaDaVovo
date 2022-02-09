var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const { loginValidator } = require('../middlewares/loginValidator');
const { signupValidator } = require('../middlewares/signupValidator');






router.get('/signup', authController.signupGet)
router.post('/signup', signupValidator, authController.signupPost)

router.post('/', loginValidator, authController.loginPost)
router.get('/', authController.loginGet)

router.get("/logout", function (req, res, next) {
    req.session.destroy();
    return res.redirect("/");
});







module.exports = router;
