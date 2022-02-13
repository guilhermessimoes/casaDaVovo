var { check } = require("express-validator");

const cadastrarRestauranteValidator = [
    check("restauranteNome").isLength({min:3, max:40}).withMessage("O campo nome tem que conter no mínimo 3 carcterer."),
    check("restauranteTipo").notEmpty().withMessage("Selecione o campo tipo é obrigatório."),
    check("restauranteCozinha").notEmpty().withMessage("Seleciona o campo cozinha."),
    check("restauranteDelivery").notEmpty().withMessage("Selecione o campo delivery."),
    check("restauranteBairro").notEmpty().withMessage("Preencha o campo bairro."),
    check("restauranteCidade").notEmpty().withMessage("Preencha o campo cidade."),
    check("restauranteEstado").notEmpty().withMessage("Preencha o campo estado."),
    check("restauranteDescricao").isLength({min:50, max:250}).notEmpty().withMessage("Preencha o campo descrição."),
    check("imagem").notEmpty().withMessage("Faça upload de uma imagem."),
]

module.exports = {cadastrarRestauranteValidator}