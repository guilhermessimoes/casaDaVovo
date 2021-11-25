var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});
router.get('listagemHotelGrid', function(req, res, next) {
  res.render('listagemHotelGrid', { title: 'Express' });
});

module.exports = router;
