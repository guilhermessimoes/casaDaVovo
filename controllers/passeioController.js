const { validationResult } = require("express-validator");
const db = require('../models') 

const passeioController = {
    listagemPasseio: async(req,res)=>{
        res.render('listagemPasseio', {formAction:"/listagemPasseio", usuario:{}})
    },

    viewCadastrarPasseio: async(req,res)=>{
        res.render('cadastrarPasseio', {formAction:"/cadastrarPasseio", usuario:{}})
    },

    acaoCadastrarPasseio: async(req,res) =>{
        const nomeUsuario = req.body.nome;
        const emailUsuario = req.body.email;
    
        await db.Usuario.create({
            nome: nomeUsuario,
            email: emailUsuario
        })
        res.redirect("/listagemPasseio")     
    }
}

module.exports = passeioController