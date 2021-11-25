var express = require('express');
var router = express.Router();
const hotelController = require('../controllers/hotelController')




router.get('/cadastrarHotel', hotelController.viewCadastrarHotel)
router.get('/listagemHotel', hotelController.listagemHotel)


module.exports = router;