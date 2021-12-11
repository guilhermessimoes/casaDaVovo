var express = require('express');
var router = express.Router();
const hotelController = require('../controllers/hotelController')
const path = require('path')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (req, res, cb) =>{
        cb(null, "./public/data/uploads")
    },
    filename:  (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })



router.get('/cadastrarHotel', hotelController.viewCadastrarHotel)
router.post('/cadastrarHotel', upload.single('hotel_imagem'), hotelController.acaoCadastrarHotel)
router.get('/listagemHotel', hotelController.listagemHotel)


module.exports = router;