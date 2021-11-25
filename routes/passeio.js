var express = require('express');
var router = express.Router();
const passeioController = require('../controllers/passeioController')




router.get('/listagemPasseio', passeioController.listagemPasseio)


module.exports = router;