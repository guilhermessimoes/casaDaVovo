var express = require('express');
var router = express.Router();
const passeioController = require('../controllers/passeioController')
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


router.get('/listagemPasseio', passeioController.listagemPasseio)

router.get('/cadastrarPasseio', passeioController.viewCadastrarPasseio)
router.post('/cadastrarPasseio', upload.single('passeio_imagem'), passeioController.acaoCadastrarPasseio)

router.get('/alterar/:id', passeioController.editar)
router.post('/alterar/:id', upload.single('passeio_imagem'), passeioController.acaoEditar)

router.get('/excluir/:id', passeioController.excluir)


module.exports = router;
