var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController')




router.get('/registrar', loginController.viewCadastrarUsuario)
router.post('/registrar', loginController.acaoCadastrarUsuario)


module.exports = router;
