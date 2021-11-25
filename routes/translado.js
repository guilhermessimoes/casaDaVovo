var express = require('express');
var router = express.Router();
const transladoController = require('../controllers/transladoController')




router.get('/listagemTranslado', transladoController.listagemTranslado)


module.exports = router;