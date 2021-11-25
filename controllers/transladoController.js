const { validationResult } = require("express-validator");
const db = require('../models') 

const transladoController = {
    listagemTranslado: async(req,res)=>{
        res.render('listagemTranslado', {formAction:"/listagemTranslado", usuario:{}})
    },

    viewCadastrarTranslado: async(req,res)=>{
        res.render('cadastrarTranslado', {formAction:"/cadastrarTranslado", usuario:{}})
    },

    acaoCadastrarTranslado: async(req,res) =>{
        const nomeUsuario = req.body.nome;
        const emailUsuario = req.body.email;
    
        await db.Usuario.create({
            nome: nomeUsuario,
            email: emailUsuario
        })
        res.redirect("/listagemTranslado")     
    }
}

module.exports = transladoController