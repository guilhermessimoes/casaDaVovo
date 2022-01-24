const { validationResult } = require("express-validator");
const db = require('../models'); 
const Usuario = require("../models/Usuario");

const transladoController = {
    listagemTranslado: async(req,res)=>{
        const cadastroTransladoRows = await db.Translado.findAll();   
       // const messages = await req.consumeFlash('success')
        res.render('listagemTranslado', {translados: cadastroTransladoRows})
    },

    viewCadastrarTranslado: async(req,res)=>{        
        res.render('cadastrarTranslado', {formAction:"cadastrarTranslado", translado:{}})
    },

    acaoCadastrarTranslado: async(req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const alert = listaDeErros.array()
            console.log(alert)
            res.render("cadastrarTranslado", {alert: alert, buttonMessage: "Cadastrar", formAction:"/cadastrarTranslado", translado:{}})
            return
            
        }
        const transladoPet = req.body.transportaPet
        const transladoDeficiente = req.body.acessivelDeficiente
        const transladoBagagens = req.body.levarBagagens
        const transladoRecolhe = req.body.recolheHotel
        const transladoDescricao = req.body.descricao
        const transladoImagem = req.file.filename
        const transladoPrecoOriginal = req.body.precoOriginalTranslado
        const transladoPrecoPromocional = req.body.precoPromocionalTranslado
        const transladoTitulo = req.body.tituloTranslado

        await db.Translado.create({
            transporta_pet: transladoPet,
            acessivel_deficiente: transladoDeficiente,
            levar_bagagens: transladoBagagens,
            recolhe_hotel: transladoRecolhe,
            descricao: transladoDescricao,
            imagem: transladoImagem,
            preco_original: transladoPrecoOriginal,
            preco_promocional: transladoPrecoPromocional,
            titulo: transladoTitulo
        })

        //await req.flash('success', "Registro criado com sucesso")

        res.redirect("/translado/listagemTranslado")   
    },

    
    editar: async (req, res)=> {
        const transladoEncontrato = await db.Translado.findByPk(req.params.id);

       // transladoEncontrato.dataFormatada = `${transladoEncontrato.data_nascimento.getFullYear()}-${('0' + transladoEncontrato.data_nascimento.getMonth() + 1).slice(-2)}-${('0' + (transladoEncontrato.data_nascimento.getDate())).slice(-2)}`;
        console.log(transladoEncontrato);

        res.render("cadastrarTranslado", {
            formAction:`/alterar/${req.params.id}`,
            buttonMessage: "Salvar",
            translado: transladoEncontrato
        });

    },

    acaoEditar: async (req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const transladoEncontrado = await db.Translado.findByPk(req.params.id);          
            const alert = listaDeErros.array()          
            res.render("cadastrarTranslado", {alert: alert, formAction:`/alterar/${req.params.id}`,
            buttonMessage: "Salvar", translado: transladoEncontrado})
            return            
        }
        

        const transladoObj = { 
            transladoPet: req.body.transportaPet,
            transladoDeficiente: req.body.acessivelDeficiente,
            transladoBagagens: req.body.levarBagagens,
            transladoRecolhe: req.body.recolheHotel,
            transladoDescricao: req.body.descricao,
            transladoPrecoOriginal: req.body.precoOriginalTranslado,
            transladoPrecoPromocional: req.body.precoPromocionalTranslado,
            transladoTitulo: req.body.tituloTranslado,
            transladoImagem: req.file.filename
        }

        await db.Translado.update(transladoObj, {where: {id: req.params.id}})

        //await req.flash('success', "Registro editado com sucesso")

        res.redirect("/")
    },

    excluir: async (req, res)=> {
        const idTranslado = req.params.id;
        
        //await req.flash('success', "Registro excluido com sucesso")
        await db.Translado.destroy({where: {id: idTranslado}})
        res.redirect("/translado/listagemTranslado")
    }
}

module.exports = transladoController