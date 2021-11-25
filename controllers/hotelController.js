const { validationResult } = require("express-validator");
const db = require('../models') 

const hotelController = {
    listagemHotel: async(req,res)=>{
        res.render('listagemHotelGrid', {formAction:"/listagemHotelGrid", usuario:{}})
    },

    viewCadastrarHotel: async(req,res)=>{
        res.render('cadastrarHotel', {formAction:"/cadastrarHotel", usuario:{}})
    },

    acaoCadastrarHotel: async(req,res) =>{
        const nomeUsuario = req.body.nome;
        const emailUsuario = req.body.email;
    
        await db.Usuario.create({
            nome: nomeUsuario,
            email: emailUsuario
        })
        res.redirect("/listagemHotelGrid")     
    }
}

module.exports = hotelController