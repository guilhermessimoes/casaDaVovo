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


router.get('/listagemHotel', hotelController.listagemHotel)

router.get('/cadastrarHotel', hotelController.viewCadastrarHotel)
router.post('/cadastrarHotel', upload.single('hotel_imagem'), hotelController.acaoCadastrarHotel)

router.get('/alterar/:id', hotelController.editar)
router.post('/alterar/:id', upload.single('hotel_imagem'), hotelController.acaoEditar)

router.get('/excluir/:id', hotelController.excluir)


module.exports = router;
