const { validationResult } = require("express-validator");
const db = require('../models') 

const hotelController = {
    listagemHotel: async(req,res)=>{
        const cadastroHotelRows = await db.Hotel.findAll();   
       // const messages = await req.consumeFlash('success')
        res.render('listagemHotel', {hoteis: cadastroHotelRows})
    },

    viewCadastrarHotel: async(req,res)=>{
        res.render('cadastrarHotel', {formAction:"cadastrarHotel", hotel:{}})
    },

    acaoCadastrarHotel: async(req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const alert = listaDeErros.array()
            console.log(alert)
            res.render("cadastrarHotel", {alert: alert, buttonMessage: "Cadastrar", formAction:"/cadastrarHotel", hotel:{}})
            return
        }
        
        const hotelTipo = req.body.hotel_tipo
        const hotelNome = req.body.hotel_nome
        const hotelTelefone = req.body.hotel_telefone
        const hotelQuantidadeUnidades = req.body.hotel_quantidade_unidades
        const hotelCategoriaUnidades = req.body.hotel_categoria_unidades
        const hotelHorarioCheckIn = req.body.hotel_horario_check_in
        const hotelHorarioCheckOut = req.body.hotel_horario_check_out
        const hotelImagem = req.file.filename
        const hotelFacilidades = req.body.hotel_facilidades
        const hotelEndereco = req.body.hotel_endereco
        const hotelEnderecoNumero = req.body.hotel_endereco_numero
        const hotelEmail = req.body.hotel_email
        const hotelPreco = req.body.hotel_preco
        const hotelEnderecoCidade = req.body.hotel_endereco_cidade
        const hotelEnderecoBairro = req.body.hotel_endereco_bairro
        const hotelEnderecoEstado = req.body.hotel_endereco_estado
        const hotelEnderecoCep = req.body.hotel_endereco_cep

        await db.Hotel.create({
            hotel_tipo: hotelTipo,
            hotel_nome: hotelNome,
            hotel_telefone: hotelTelefone,
            hotel_quantidade_unidades: hotelQuantidadeUnidades,
            hotel_categoria_unidades: hotelCategoriaUnidades,
            hotel_horario_check_in: hotelHorarioCheckIn,
            hotel_horario_check_out: hotelHorarioCheckOut,
            hotel_imagem: hotelImagem,
            hotel_facilidades: hotelFacilidades, 
            hotel_endereco: hotelEndereco, 
            hotel_endereco_numero: hotelEnderecoNumero,
            hotel_email: hotelEmail,
            hotel_preco: hotelPreco,
            hotel_endereco_cidade: hotelEnderecoCidade,
            hotel_endereco_bairro: hotelEnderecoBairro,
            hotel_endereco_estado: hotelEnderecoEstado,
            hotel_endereco_cep: hotelEnderecoCep,
        })

        //await req.flash('success', "Registro criado com sucesso")

        res.redirect("/hotel/listagemHotel")   
    },

    editar: async (req, res)=> {
        const hotelEncontrato = await db.Hotel.findByPk(req.params.id);
        
        console.log(hotelEncontrato);

        res.render("cadastrarHotel", {
            formAction:`/alterar/${req.params.id}`,
            buttonMessage: "Salvar",
            hotel: hotelEncontrato
        });
    },

    acaoEditar: async (req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const hotelEncontrado = await db.Hotel.findByPk(req.params.id);          
            const alert = listaDeErros.array()
            console.log(alert)

            res.render("cadastrarHotel", {alert: alert, formAction:`/alterar/${req.params.id}`,
            buttonMessage: "Salvar", hotel: hotelEncontrado})
            return            
        }

        const hotelObj = { 
            hotel_tipo: hotelTipo,
            hotel_nome: hotelNome,
            hotel_telefone: hotelTelefone,
            hotel_quantidade_unidades: hotelQuantidadeUnidades,
            hotel_categoria_unidades: hotelCategoriaUnidades,
            hotel_horario_check_in: hotelHorarioCheckIn,
            hotel_horario_check_out: hotelHorarioCheckOut,
            hotel_imagem: hotelImagem,
            hotel_facilidades: hotelFacilidades, 
            hotel_endereco: hotelEndereco, 
            hotel_endereco_numero: hotelEnderecoNumero,
            hotel_email: hotelEmail,
            hotel_preco: hotelPreco,
            hotel_endereco_cidade: hotelEnderecoCidade,
            hotel_endereco_bairro: hotelEnderecoBairro,
            hotel_endereco_estado: hotelEnderecoEstado,
            hotel_endereco_cep: hotelEnderecoCep
        }

        await db.Hotel.update(hotelObj, {where: {id: req.params.id}})

        //await req.flash('success', "Registro editado com sucesso")

        res.redirect("/")
    },

    excluir: async (req, res)=> {
        const idHotel = req.params.id;
        
        //await req.flash('success', "Registro excluido com sucesso")
        await db.Hotel.destroy({where: {id: idHotel}})
        res.redirect("/hotel/listagemHotel")
    }
}

module.exports = hotelController
