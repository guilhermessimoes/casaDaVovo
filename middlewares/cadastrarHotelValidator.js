var { check } = require("express-validator");

const cadastrarHotelValidator = [
    check("hotel_nome").isLength({min:3, max:40}).withMessage("O nome do hotel é obrigátorio."),
    check("hotel_tipo").notEmpty().withMessage("O tipo do hotel é obrigátorio."),
    check("hotel_telefone").notEmpty().withMessage("O telefone do hotel é obrigátorio."),
    check("hotel_quantidade_unidades").notEmpty().withMessage("A quantidade de unidades é obrigatoria."),
    check("hotel_categoria_unidades").notEmpty().withMessage("A categoria da unidade é obrigatoria."),
    check("hotel_horario_check_in").notEmpty().withMessage("O preenchimento do check-in é obrigatorio.."),
    check("hotel_horario_check_out").notEmpty().withMessage("O preenchimento do check-out é obrigatorio."),
    check("hotel_facilidades").notEmpty().withMessage("Preencha o campo facilidades"),
    check("hotel_email").notEmpty().withMessage("Preencha o campo e-mail."),
    check("hotel_preco").notEmpty().withMessage("Preencha o campo preço."),
    check("hotel_endereco").notEmpty().withMessage("Preencha o campo endereço."),
    check("hotel_endereco_numero").notEmpty().withMessage("Preencha o campo numero."),
    check("hotel_endereco_bairro").notEmpty().withMessage("Preencha o bairro."),
    check("hotel_endereco_cep").notEmpty().withMessage("Preencha o cep."),
    check("hotel_endereco_cidade").notEmpty().withMessage("Preencha a cidade."),
    check("hotel_endereco_estado").notEmpty().withMessage("Preencha o estado."),
    //check("hotel_imagem").notEmpty().withMessage("Selecione uma imagem."),
]

module.exports = {cadastrarHotelValidator}