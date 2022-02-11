var express = require('express');
var router = express.Router();
const passeioController = require('../controllers/passeioController')
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
const {cadastrarPasseioValidator} = require('../middlewares/cadastrarPasseioValidator')
const verifyLogin = require('../middlewares/session')

router.get('/detalhePasseio/:id', passeioController.detalhePasseio)

router.get('/listagemPasseio', passeioController.listagemPasseio)

router.get('/cadastrarPasseio',verifyLogin, passeioController.viewCadastrarPasseio)
router.post('/cadastrarPasseio',verifyLogin, upload.single('imagem'), cadastrarPasseioValidator, passeioController.acaoCadastrarPasseio)

router.get('/alterar/:id',verifyLogin, passeioController.editar)
router.post('/alterar/:id',verifyLogin, upload.single('imagem'),cadastrarPasseioValidator, passeioController.acaoEditar)

router.get('/excluir/:id',verifyLogin, passeioController.excluir)


module.exports = router;
