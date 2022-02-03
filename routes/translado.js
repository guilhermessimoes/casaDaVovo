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
const verifyLogin = require('../middlewares/session')

router.get('/detalheTranslado/:id', transladoController.detalheTranslado)

router.get('/listagemTranslado', transladoController.listagemTranslado)

router.get('/cadastrarTranslado',verifyLogin, transladoController.viewCadastrarTranslado)
router.post('/cadastrarTranslado',verifyLogin, upload.single('imagem'), cadastrarTransladoValidator, transladoController.acaoCadastrarTranslado)

router.get('/alterar/:id',verifyLogin, transladoController.editar)
router.post('/alterar/:id',verifyLogin, upload.single('imagem'),cadastrarTransladoValidator, transladoController.acaoEditar)

router.get('/excluir/:id',verifyLogin, transladoController.excluir)


module.exports = router;