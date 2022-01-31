var express = require('express');
var router = express.Router();
const transladoController = require('../controllers/transladoController')
const path = require('path')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (_req, _res, cb) =>{
        cb(null, "public/data/uploads")
    },
    filename:  (_req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })
const {cadastrarTransladoValidator} = require('../middlewares/cadastrarTransladoValidator')
const {authMidllewareToken} = require('../middlewares/auth')

router.get('/listagemTranslado', transladoController.listagemTranslado)

<<<<<<< HEAD
router.get('/detalheTranslado/:id', transladoController.detalheTranslado)

router.get('/cadastrarTranslado', transladoController.viewCadastrarTranslado)
router.post('/cadastrarTranslado', upload.single('imagem'), cadastrarTransladoValidator, transladoController.acaoCadastrarTranslado)
=======
router.get('/cadastrarTranslado', transladoController.viewCadastrarTranslado)
router.post('/cadastrarTranslado', upload.single('imagemTranslado'), cadastrarTransladoValidator, transladoController.acaoCadastrarTranslado)
>>>>>>> ee05f407f76e20e3ffeec95c14036903af18710d

router.get('/alterar/:id', transladoController.editar)
router.post('/alterar/:id', upload.single('imagem'),cadastrarTransladoValidator, transladoController.acaoEditar)

router.get('/excluir/:id', transladoController.excluir)

module.exports = router;