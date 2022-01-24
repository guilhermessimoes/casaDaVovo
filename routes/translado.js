var express = require('express');
var router = express.Router();
const transladoController = require('../controllers/transladoController')
const path = require('path')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (req, res, cb) =>{
        cb(null, "public/data/uploads")
    },
    filename:  (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })
const {cadastrarTransladoValidator} = require('../middlewares/cadastrarTransladoValidator')
const {authMidllewareToken} = require('../middlewares/auth')


router.get('/listagemTranslado', transladoController.listagemTranslado)
router.use(authMidllewareToken)

router.get('/cadastrarTranslado', authMidllewareToken, transladoController.viewCadastrarTranslado)
router.post('/cadastrarTranslado', upload.single('imagemTranslado'), cadastrarTransladoValidator, transladoController.acaoCadastrarTranslado)

router.get('/alterar/:id', transladoController.editar)
router.post('/alterar/:id', upload.single('imagemTranslado'),cadastrarTransladoValidator, transladoController.acaoEditar)

router.get('/excluir/:id', transladoController.excluir)



module.exports = router;