var express = require('express');
var router = express.Router();
const hotelController = require('../controllers/hotelController')
const path = require('path')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (_req, _res, cb) =>{
        cb(null, "./public/data/uploads")
    },
    filename:  (_req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })
const {cadastrarHotelValidator} = require('../middlewares/cadastrarHotelValidator')
const verifyLogin = require('../middlewares/session')

router.get('/detalheHotel/:id', hotelController.detalheHotel)

router.get('/listagemHotel', hotelController.listagemHotel)

router.get('/cadastrarHotel',verifyLogin, hotelController.viewCadastrarHotel)
router.post('/cadastrarHotel',verifyLogin, upload.single('imagem'), cadastrarHotelValidator, hotelController.acaoCadastrarHotel)

router.get('/alterar/:id',verifyLogin, hotelController.editar)
router.post('/alterar/:id',verifyLogin, upload.single('imagem'),cadastrarHotelValidator, hotelController.acaoEditar)

router.get('/excluir/:id',verifyLogin, hotelController.excluir)


module.exports = router;
