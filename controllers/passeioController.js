const { validationResult } = require("express-validator");
const db = require('../models') 

const passeioController = {
    listagemPasseio: async(req,res)=>{
        const cadastroPasseioRows = await db.Passeio.findAll();   
       // const messages = await req.consumeFlash('success')
        res.render('listagemPasseio', {passeios: cadastroPasseioRows})
    },

    viewCadastrarPasseio: async(req,res)=>{
        res.render('cadastrarPasseio', {formAction:"cadastrarPasseio", passeio:{}})
    },

    acaoCadastrarPasseio: async(req,res) =>{
        const passeioTitulo = req.body.passeio_titulo
        const passeioDescricao = req.body.passeio_descricao
        const passeioLugar = req.body.passeio_lugar
        const passeioRua = req.body.passeio_rua
        const passeioCidade = req.body.passeio_cidade
        const passeioEstado = req.body.passeio_estado
        const passeioCep = req.body.passeio_cep
        const passeioData = req.body.passeio_data
        const passeioHorario = req.body.passeio_horario
        const passeioValor = req.body.passeio_valor
        const passeioImagem = req.file.filename
        const passeioPrecoPromocional = req.body.passeio_preco_promocional
        
        await db.Passeio.create({
            passeio_titulo: passeioTitulo,
            passeio_descricao: passeioDescricao,
            passeio_lugar: passeioLugar,
            passeio_rua: passeioRua,
            passeio_cidade: passeioCidade,
            passeio_estado: passeioEstado,
            passeio_cep: passeioCep,
            passeio_data: passeioData,
            passeio_horario: passeioHorario,
            passeio_valor: passeioValor,
            passeio_imagem: passeioImagem,
            passeio_preco_promocional: passeioPrecoPromocional,
            
        })

        //await req.flash('success', "Registro criado com sucesso")

        res.redirect("/passeio/listagemPasseio")   
    },

    editar: async (req, res)=> {
        const passeioEncontrato = await db.Passeio.findByPk(req.params.id);

       // passeioEncontrato.dataFormatada = `${passeioEncontrato.data_nascimento.getFullYear()}-${('0' + passeioEncontrato.data_nascimento.getMonth() + 1).slice(-2)}-${('0' + (passeioEncontrato.data_nascimento.getDate())).slice(-2)}`;
        console.log(passeioEncontrato);

        res.render("cadastrarPasseio", {
            formAction:`/alterar/${req.params.id}`,
            buttonMessage: "Salvar",
            passeio: passeioEncontrato
        });

    },

    acaoEditar: async (req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const passeioEncontrado = await db.Passeio.findByPk(req.params.id);          
            const alert = listaDeErros.array()
            console.log(alert)

            res.render("cadastrarPasseio", {alert: alert, formAction:`/alterar/${req.params.id}`,
            buttonMessage: "Salvar", passeio: passeioEncontrado})
            return            
        }

        const passeioObj = { 
            passeio_titulo: passeioTitulo,
            passeio_descricao: passeioDescricao,
            passeio_lugar: passeioLugar,
            passeio_rua: passeioRua,
            passeio_cidade: passeioCidade,
            passeio_estado: passeioEstado,
            passeio_cep: passeioCep,
            passeio_data: passeioData,
            passeio_horario: passeioHorario,
            passeio_valor: passeioValor,
            passeio_imagem: passeioImagem,
            passeio_preco_promocional: passeioPrecoPromocional,
        }

        await db.Passeio.update(passeioObj, {where: {id: req.params.id}})

        //await req.flash('success', "Registro editado com sucesso")

        res.redirect("/")
    },

    excluir: async (req, res)=> {
        const idPasseio = req.params.id;
        
        //await req.flash('success', "Registro excluido com sucesso")
        await db.Passeio.destroy({where: {id: idPasseio}})
        res.redirect("/passeio/listagemPasseio")
    }
}

module.exports = passeioController
