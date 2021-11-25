var express = require('express');
var router = express.Router();
const restauranteController = require('../controllers/restauranteController')




router.get('/listagemRestaurante', restauranteController.listagemRestaurante)


module.exports = router;