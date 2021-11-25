const { validationResult } = require("express-validator");
const db = require('../models') 

const restauranteController = {
    listagemRestaurante: async(req,res)=>{
        res.render('listagemRestaurante', {formAction:"/listagemRestaurante", usuario:{}})
    },

    viewCadastrarRestaurante: async(req,res)=>{
        res.render('cadastrarRestaurante', {formAction:"/cadastrarRestaurante", usuario:{}})
    },

    acaoCadastrarRestaurante: async(req,res) =>{
        const nomeUsuario = req.body.nome;
        const emailUsuario = req.body.email;
    
        await db.Usuario.create({
            nome: nomeUsuario,
            email: emailUsuario
        })
        res.redirect("/listagemRestaurante")     
    }
}

module.exports = restauranteController