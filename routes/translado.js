var express = require('express');
var router = express.Router();
const transladoController = require('../controllers/transladoController')
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



router.get('/cadastrarTranslado', transladoController.viewCadastrarTranslado)
router.post('/cadastrarTranslado', upload.single('imagemTranslado'), transladoController.acaoCadastrarTranslado)
router.get('/listagemTranslado', transladoController.listagemTranslado)


module.exports = router;