var { check } = require("express-validator");

const cadastrarHotelValidator = [
    check("hotelNome").isLength({min:3, max:40}).withMessage("O nome do hotel é obrigátorio."),
    check("hotelTipo").notEmpty().withMessage("O tipo do hotel é obrigátorio."),
    check("hotelTelefone").notEmpty().withMessage("O telefone do hotel é obrigátorio."),
    check("hotelQuantidadeUnidades").notEmpty().withMessage("A quantidade de unidades é obrigatoria."),    
    check("hotelEmail").notEmpty().withMessage("Preencha o campo e-mail."),
    check("hotelPreco").notEmpty().withMessage("Preencha o campo preço."),
    check("hotelEndereco").notEmpty().withMessage("Preencha o campo endereço."),
    check("hotelEnderecoNumero").notEmpty().withMessage("Preencha o campo numero."),
    check("hotelEnderecoBairro").notEmpty().withMessage("Preencha o bairro."),
    check("hotelEnderecoCep").notEmpty().withMessage("Preencha o cep."),
    check("hotelEnderecoCidade").notEmpty().withMessage("Preencha a cidade."),
    check("hotelEnderecoEstado").notEmpty().withMessage("Preencha o estado."),
    check("imagem").notEmpty().withMessage("Selecione uma imagem."),
    check("hotelDescricao").notEmpty().withMessage("Preencha o campo Descrição.")
]

module.exports = {cadastrarHotelValidator}