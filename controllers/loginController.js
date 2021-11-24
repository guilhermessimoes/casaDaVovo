const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const db = require('../models') 

const loginController = {
    viewCadastrarUsuario: async(req,res)=>{
        res.render('registrar', {formAction:"/login/registrar", usuario:{}})
    },

    acaoCadastrarUsuario: async(req,res) =>{
        const nomeUsuario = req.body.nome;
        const emailUsuario = req.body.email;
        const salt = bcrypt.genSaltSync(10);
        const senhaCriptografada = bcrypt.hashSync(req.body.senha, salt);
    
        await db.Usuario.create({
            nome: nomeUsuario,
            email: emailUsuario,
            senha: senhaCriptografada
        })
        res.redirect("/")     
    }
}

module.exports = loginController