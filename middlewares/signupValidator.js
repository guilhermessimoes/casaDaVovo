var { check } = require("express-validator");

const signupValidator = [
    check("nome").isLength({min:3, max:40}).withMessage("Preencha o seu nome completo."),
    check("email").isLength({min:3, max:40}).withMessage("Preencha o campo email."),
    check("senha").notEmpty().withMessage("Preencha o campo senha."),
    check("confirmacaoSenha").notEmpty().withMessage("Preencha o campo senha."),
  ]

module.exports = {signupValidator}