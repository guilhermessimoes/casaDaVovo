var { check } = require("express-validator");

const loginValidator = [
    check("email").isLength({min:3, max:40}).withMessage("Preencha o campo email."),
    check("senha").notEmpty().withMessage("Preencha o campo senha."),
  ]

module.exports = {loginValidator}