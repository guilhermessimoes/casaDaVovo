const { validationResult } = require("express-validator");
const db = require('../models') 
const moment= require("moment")


const passeioController = {
    detalhePasseio: async(req,res)=>{
        const cadastroEncontrado = await db.Passeio.findByPk(req.params.id);
        res.render('detalhePasseio', {passeios: cadastroEncontrado})

    },

    viewCadastrarPasseio: async(req,res)=>{
        res.render('cadastrarPasseio', {formAction:"cadastrarPasseio", passeio:{}})
    },

    acaoCadastrarPasseio: async(req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const alert = listaDeErros.array()
            res.render("cadastrarPasseio", {alert: alert, formAction:"/passeio/cadastrarPasseio", passeio:{}})
            return            
        }
        const passeioTitulo = req.body.passeioTitulo
        const passeioDescricao = req.body.passeioDescricao       
        const passeioCidade = req.body.passeioCidade
        const passeioEstado = req.body.passeioEstado
        const passeioData = req.body.passeioData
        const passeioHorario = req.body.passeioHorario
        const passeioValor = req.body.passeioValor
        const passeioImagem = req.file.filename
        const passeioPrecoPromocional = req.body.passeioPrecoPromocional

               
        await db.Passeio.create({
            passeio_titulo: passeioTitulo,
            passeio_descricao: passeioDescricao,
            passeio_cidade: passeioCidade,
            passeio_estado: passeioEstado,
            passeio_data: moment(passeioData, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            passeio_horario: passeioHorario,
            passeio_valor: passeioValor,
            passeio_imagem: passeioImagem,
            passeio_preco_promocional: passeioPrecoPromocional,
            
        })

        await req.flash('success', "Registro criado com sucesso")
        res.redirect("/passeio/listagemPasseio")   
    },

    editar: async (req, res)=> {
        const passeioEncontrato = await db.Passeio.findByPk(req.params.id);

        res.render("cadastrarPasseio", {
            formAction:`/passeio/alterar/${req.params.id}`,
            buttonMessage: "Salvar",
            passeio: passeioEncontrato
        });

    },

    acaoEditar: async (req,res) =>{
        let listaDeErros = validationResult(req)
        console.log(listaDeErros)
        if(!listaDeErros.isEmpty()){
            const passeioEncontrado = await db.Passeio.findByPk(req.params.id);          
            const alert = listaDeErros.array()
            res.render("cadastrarPasseio", {alert: alert, formAction:`/passeio/alterar/${req.params.id}`, passeio: passeioEncontrado})
            return            
        }

        const passeioObj = { 
            passeio_titulo: req.body.passeioTitulo,
            passeio_descricao: req.body.passeioDescricao,
            passeio_cidade: req.body.passeioCidade,
            passeio_estado: req.body.passeioEstado,
            passeio_data: req.body.passeioData,
            passeio_horario: req.body.passeioHorario,
            passeio_valor: req.body.passeioValor,
            passeio_imagem: req.file.filename,
            passeio_preco_promocional: req.body.passeioPrecoPromocional,
        }

        const updatePasseio= await db.Passeio.update(passeioObj, {where: {id: req.params.id}})
        console.log(updatePasseio)

        await req.flash('success', "Registro editado com sucesso")

        res.redirect("/passeio/listagemPasseio")
    },

    excluir: async (req, res)=> {
        const idPasseio = req.params.id;
        
        await req.flash('success', "Registro excluido com sucesso")
        await db.Passeio.destroy({where: {id: idPasseio}})
        res.redirect("/passeio/listagemPasseio")
    },

    listagemPasseio: async(req,res)=>{
        const cadastroPasseioRows = await db.Passeio.findAll();   
        const messages = await req.consumeFlash('success')
        res.render('listagemPasseio',  {passeios: cadastroPasseioRows, messages})
    },

}

module.exports = passeioController
