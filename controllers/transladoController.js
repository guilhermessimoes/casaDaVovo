const { validationResult } = require("express-validator");
const db = require('../models'); 

const transladoController = {
    detalheTranslado: async(req,res)=>{
        const cadastroEncontrado = await db.Translado.findByPk(req.params.id);
        res.render('detalheTranslado', {translados: cadastroEncontrado})
    },

    viewCadastrarTranslado: async(req,res)=>{      
        res.render('cadastrarTranslado', {formAction:"cadastrarTranslado", translado:{}, })
    },
   
    acaoCadastrarTranslado: async(req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const alert = listaDeErros.array()
            res.render("cadastrarTranslado", {alert: alert, buttonMessage: "Cadastrar", formAction:"/translado/cadastrarTranslado", translado:{}})
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

        const cadastrarTranslado = await db.Translado.create({
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

        console.log(cadastrarTranslado)

        await req.flash('success', "Registro criado com sucesso")
        res.redirect("/translado/listagemTranslado")   
    },    
    
    editar: async (req, res)=> {
        const transladoEncontrato = await db.Translado.findByPk(req.params.id);

        res.render("cadastrarTranslado", {
            formAction:`/translado/alterar/${req.params.id}`,
            buttonMessage: "Salvar",
            translado: transladoEncontrato
        });

    },

    acaoEditar: async (req,res) =>{
        let listaDeErros = validationResult(req)
        console.log(listaDeErros)
        if(!listaDeErros.isEmpty()){
            const transladoEncontrado = await db.Translado.findByPk(req.params.id);          
            const alert = listaDeErros.array()          
            res.render("cadastrarTranslado", {alert: alert, formAction:`/translado/alterar/${req.params.id}`, translado: transladoEncontrado})
            return            
        }
        

        const transladoObj = { 
            transporta_pet: req.body.transportaPet,
            acessivel_deficiente: req.body.acessivelDeficiente,
            levar_bagagens: req.body.levarBagagens,
            recolhe_hotel: req.body.recolheHotel,
            descricao: req.body.descricao,
            preco_original: req.body.precoOriginalTranslado,
            preco_promocional: req.body.precoPromocionalTranslado,
            titulo: req.body.tituloTranslado,
            imagem: req.file.filename
        }

        const updateTranslado= await db.Translado.update(transladoObj, {where: {id: req.params.id}})
        console.log(updateTranslado)

        await req.flash('success', "Registro editado com sucesso")

        res.redirect("/translado/listagemTranslado")
    },

    excluir: async (req, res)=> {
        const idTranslado = req.params.id;
        
        await req.flash('success', "Registro excluido com sucesso")
        await db.Translado.destroy({where: {id: idTranslado}})
        res.redirect("/translado/listagemTranslado")
    },

    listagemTranslado: async(req,res)=>{
        const cadastroTransladoRows = await db.Translado.findAll();   
        const messages = await req.consumeFlash('success')
        res.render('listagemTranslado',  {translados: cadastroTransladoRows, messages})
    },

}

module.exports = transladoController