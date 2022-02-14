const { validationResult } = require("express-validator");
const db = require('../models') 

const hotelController = {
    detalheHotel: async(req,res)=>{
        const cadastroEncontrado = await db.Hotel.findByPk(req.params.id);
        res.render('detalheHotel', {hoteis: cadastroEncontrado})    
    },

    viewCadastrarHotel: async(req,res)=>{
        
        res.render('cadastrarHotel', {formAction:"/hotel/cadastrarHotel", hotel:{hotel_facilidades:[]}})
        
    },

    acaoCadastrarHotel: async(req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const alert = listaDeErros.array()            
            res.render("cadastrarHotel", {alert: alert, formAction:"/hotel/cadastrarHotel", hotel:{hotel_facilidades:[]}})
            return
        }
        console.log(req.body)
        const hotelTipo = req.body.hotelTipo
        const hotelNome = req.body.hotelNome
        const hotelTelefone = req.body.hotelTelefone
        const hotelQuantidadeUnidades = req.body.hotelQuantidadeUnidades                
        const hotelImagem = req.file.filename
        const facilidades = req.body.facilidades.toString()
        const hotelEndereco = req.body.hotelEndereco
        const hotelEnderecoNumero = req.body.hotelEnderecoNumero
        const hotelEmail = req.body.hotelEmail
        const hotelPreco = req.body.hotelPreco
        const hotelEnderecoCidade = req.body.hotelEnderecoCidade
        const hotelEnderecoBairro = req.body.hotelEnderecoBairro
        const hotelEnderecoEstado = req.body.hotelEnderecoEstado
        const hotelEnderecoCep = req.body.hotelEnderecoCep
        const hotelEnderecoComplemento = req.body.hotelEnderecoComplemento
        const hotelPrecoPromo = req.body.hotelPrecoPromo
        const hotelDescricao = req.body.hotelDescricao


        await db.Hotel.create({
            hotel_tipo: hotelTipo,
            hotel_nome: hotelNome,
            hotel_telefone: hotelTelefone,
            hotel_quantidade_unidades: hotelQuantidadeUnidades,                        
            hotel_imagem: hotelImagem,
            hotel_facilidades: facilidades, 
            hotel_endereco: hotelEndereco, 
            hotel_endereco_numero: hotelEnderecoNumero,
            hotel_email: hotelEmail,
            hotel_preco: hotelPreco,
            hotel_endereco_cidade: hotelEnderecoCidade,
            hotel_endereco_bairro: hotelEnderecoBairro,
            hotel_endereco_estado: hotelEnderecoEstado,
            hotel_endereco_cep: hotelEnderecoCep,
            hotel_endereco_complemento: hotelEnderecoComplemento,
            hotel_preco_promo: hotelPrecoPromo,
            hotel_descricao: hotelDescricao,

        })

        await req.flash('success', "Registro criado com sucesso")
        res.redirect("/hotel/listagemHotel")   
    },

    editar: async (req, res)=> {
        const hotelEncontrado = await db.Hotel.findByPk(req.params.id);
        const facilidades = hotelEncontrado.hotel_facilidades.split(',')
        hotelEncontrado.hotel_facilidades = facilidades        

        res.render("cadastrarHotel", {
            formAction:`/hotel/alterar/${req.params.id}`,
            buttonMessage: "Salvar",
            hotel: hotelEncontrado
        });
    },

    acaoEditar: async (req,res) =>{
        let listaDeErros = validationResult(req)
        console.log(listaDeErros)
        if(!listaDeErros.isEmpty()){
            const hotelEncontrado = await db.Hotel.findByPk(req.params.id);          
            const alert = listaDeErros.array()
            res.render("cadastrarHotel", {alert: alert, formAction:`/hotel/alterar/${req.params.id}`, hotel: hotelEncontrado})
            return            
        }

        const hotelObj = { 
            hotel_tipo: req.body.hotelTipo,
            hotel_nome: req.body.hotelNome,
            hotel_telefone: req.body.hotelTelefone,
            hotel_quantidade_unidades: req.body.hotelQuantidadeUnidades,                        
            hotel_imagem: req.body.hotelImagem,
            hotel_facilidades: req.body.hotelFacilidades, 
            hotel_endereco: req.body.hotelEndereco, 
            hotel_endereco_numero: req.body.hotelEnderecoNumero,
            hotel_email: req.body.hotelEmail,
            hotel_preco: req.body.hotelPreco,
            hotel_endereco_cidade: req.body.hotelEnderecoCidade,
            hotel_endereco_bairro: req.body.hotelEnderecoBairro,
            hotel_endereco_estado: req.body.hotelEnderecoEstado,
            hotel_endereco_cep: req.body.hotelEnderecoCep,
            hotel_endereco_complemento: req.body.hotelEnderecoComplemento,
            hotel_preco_promo: req.body.hotelPrecoPromo,
            hotel_descricao: req.body.hotelDescricao,
        }
        const updateHotel= await db.Hotel.update(hotelObj, {where: {id: req.params.id}})
        console.log(updateHotel)

        await req.flash('success', "Registro editado com sucesso")

        res.redirect("/hotel/listagemHotel")
    },

    excluir: async (req, res)=> {
        const idHotel = req.params.id;
        
        await req.flash('success', "Registro excluido com sucesso")
        await db.Hotel.destroy({where: {id: idHotel}})
        res.redirect("/hotel/listagemHotel")
    },

    listagemHotel: async(req,res)=>{
        const cadastroHotelRows = await db.Hotel.findAll();   
        const messages = await req.consumeFlash('success')
        res.render('listagemHotel',  {hoteis: cadastroHotelRows, messages})
    },

}

module.exports = hotelController


