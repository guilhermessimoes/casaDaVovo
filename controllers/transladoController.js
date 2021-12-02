const { validationResult } = require("express-validator");
const db = require('../models') 

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
            transportaPet: transladoPet,
            acessivelDeficiente: transladoDeficiente,
            levarBagagens: transladoBagagens,
            recolheHotel: transladoRecolhe,
            descricao: transladoDescricao,
            imagemTranslado: transladoImagem,
            precoOriginalTranslado: transladoPrecoOriginal,
            precoPromocionalTranslado: transladoPrecoPromocional,
            tituloTranslado: transladoTitulo
        })

        //await req.flash('success', "Registro criado com sucesso")

        res.redirect("/translado/listagemTranslado")   
    },

    acaoEditar: async (req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const transladoEncontrado = await db.Translado.findByPk(req.params.id);          
            const alert = listaDeErros.array()
            console.log(alert)

            res.render("cadastrarTranslado", {alert: alert, formAction:`/alterar/${req.params.id}`,
            buttonMessage: "Salvar", translado: transladoEncontrado})
            return            
        }

        const transladoObj = { 
            transportaPet: transladoPet,
            acessivelDeficiente: transladoDeficiente,
            levarBagagens: transladoBagagens,
            recolheHotel: transladoRecolhe,
            descricao: transladoDescricao,
            filename: transladoImagem
        }

        await db.Translado.update(transladoObj, {where: {id: req.params.id}})

        //await req.flash('success', "Registro editado com sucesso")

        res.redirect("/")
    },

    excluir: async (req, res)=> {
        const idTranslado = req.params.id;
        
        await req.flash('success', "Registro excluido com sucesso")
        await db.Translado.destroy({where: {id: idTranslado}})
        res.redirect("/")
    }
}

module.exports = transladoController