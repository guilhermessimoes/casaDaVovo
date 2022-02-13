var express = require('express');
var router = express.Router();
const restauranteController = require('../controllers/restauranteController')
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
const {cadastrarRestauranteValidator} = require('../middlewares/cadastrarRestauranteValidator')
const verifyLogin = require('../middlewares/session')

router.get('/detalheRestaurante/:id', restauranteController.detalheRestaurante)

router.get('/listagemRestaurante', restauranteController.listagemRestaurante)

router.get('/cadastrarRestaurante',verifyLogin, restauranteController.viewCadastrarRestaurante)
router.post('/cadastrarRestaurante',verifyLogin, upload.single('imagem'), cadastrarRestauranteValidator, restauranteController.acaoCadastrarRestaurante)

router.get('/alterar/:id',verifyLogin, restauranteController.editar)
router.post('/alterar/:id',verifyLogin, upload.single('imagem'),cadastrarRestauranteValidator, restauranteController.acaoEditar)

router.get('/excluir/:id',verifyLogin, restauranteController.excluir)


module.exports = router;