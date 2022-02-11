var { check } = require("express-validator");

const cadastrarPasseioValidator = [
    check("passeioTitulo").isLength({min:3, max:40}).withMessage("O título do passeio é obrigátorio."),
    check("passeioCidade").notEmpty().withMessage("A cidade do passeio é obrigátoria."),
    check("passeioEstado").notEmpty().withMessage("O estado do passeio é obrigátorio."),
    check("passeioData").notEmpty().withMessage("A data do passeio é obrigatoria."),    
    check("passeioHorario").notEmpty().withMessage("O horário do passeio é obrigatório."),
    check("passeioValor").notEmpty().withMessage("Preencha o campo preço."),
    check("passeioPrecoPromocional").notEmpty().withMessage("Preencha o campo preço."),
    check("imagem").notEmpty().withMessage("Selecione uma imagem."),
    check("passeioDescricao").notEmpty().withMessage("Preencha o campo Descrição.")
]

module.exports = {cadastrarPasseioValidator}