const { validationResult } = require("express-validator");
const db = require('../models'); 

const restauranteController = {
    detalheRestaurante: async(req,res)=>{
        const cadastroEncontrado = await db.Restaurante.findByPk(req.params.id);
        res.render('detalheRestaurante', {restaurantes: cadastroEncontrado})
    },

    viewCadastrarRestaurante: async(req,res)=>{      
        res.render('cadastrarRestaurante', {formAction:"cadastrarRestaurante", restaurante:{} })
    },
   
    acaoCadastrarRestaurante: async(req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const alert = listaDeErros.array()
            res.render("cadastrarRestaurante", {alert: alert, formAction:"/restaurante/cadastrarRestaurante", restaurante:{}})
            return            
        }
        console.log(req.body)
        const restauranteNome = req.body.restauranteNome
        const  restauranteTipo = req.body.restauranteTipo
        const  restauranteCozinha = req.body.restauranteCozinha
        const  restauranteDelivery = req.body.restauranteDelivery
        const  restauranteBairro = req.body.restauranteBairro
        const  restauranteCidade = req.body.restauranteCidade
        const  restauranteEstado = req.body.restauranteEstado
        const  restauranteTelefone = req.body.restauranteTelefone
        const  restauranteEmail = req.body.restauranteEmail
        const  restauranteDescricao = req.body.restauranteDescricao
        const  restauranteImagem = req.file.filename

        await db.Restaurante.create({
            restaurante_nome : restauranteNome,
            restaurante_tipo : restauranteTipo,
            restaurante_cozinha : restauranteCozinha,
            restaurante_delivery : restauranteDelivery,
            restaurante_bairro : restauranteBairro,
            restaurante_cidade : restauranteCidade,
            restaurante_estado : restauranteEstado,
            restaurante_telefone: restauranteTelefone,
            restaurante_email : restauranteEmail,
            restaurante_descricao : restauranteDescricao,
            restaurante_imagem : restauranteImagem
        })

        await req.flash('success', "Registro criado com sucesso")
        res.redirect("/restaurante/listagemRestaurante")   
    },    
    
    editar: async (req, res)=> {
        const restauranteEncontrado = await db.Restaurante.findByPk(req.params.id);

        res.render("cadastrarRestaurante", {
            formAction:`/restaurante/alterar/${req.params.id}`,
            buttonMessage: "Salvar",
            restaurante: restauranteEncontrado
        });

    },

    acaoEditar: async (req,res) =>{
        let listaDeErros = validationResult(req)
        console.log(listaDeErros)
        if(!listaDeErros.isEmpty()){
            const restauranteEncontrado = await db.Restaurante.findByPk(req.params.id);          
            const alert = listaDeErros.array()          
            res.render("cadastrarRestaurante", {alert: alert, formAction:`/restaurante/alterar/${req.params.id}`, restaurante: restauranteEncontrado})
            return            
        }
        

        const restauranteObj = { 
            restaurante_nome: req.body.restauranteNome,
            restaurante_tipo: req.body.restauranteTipo,
            restaurante_cozinha: req.body.restauranteCozinha,
            restaurante_delivery: req.body.restauranteDelivery,
            restaurante_bairro: req.body.restauranteBairro,
            restaurante_cidade: req.body.restauranteCidade,
            restaurante_estado: req.body.restauranteEstado,
            restaurante_telefone: req.body.restauranteTelefone,
            restaurante_email: req.body.restauranteEmail,
            restaurante_descricao: req.body.restauranteDescricao,
            imagem: req.file.filename
        }

        const updateRestaurante= await db.Restaurante.update(restauranteObj, {where: {id: req.params.id}})
        console.log(updateRestaurante)

        await req.flash('success', "Registro editado com sucesso")

        res.redirect("/restaurante/listagemRestaurante")
    },

    excluir: async (req, res)=> {
        const idRestaurante = req.params.id;
        
        await req.flash('success', "Registro excluido com sucesso")
        await db.Restaurante.destroy({where: {id: idRestaurante}})
        res.redirect("/restaurante/listagemRestaurante")
    },

    listagemRestaurante: async(req,res)=>{
        const cadastroRestauranteRows = await db.Restaurante.findAll();   
        const messages = await req.consumeFlash('success')
        res.render('listagemRestaurante',  {restaurantes: cadastroRestauranteRows, messages})
    },

}

module.exports = restauranteController