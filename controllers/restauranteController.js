const { validationResult } = require("express-validator");
const db = require('../models') 

const restauranteController = {
    listagemRestaurante: async(req,res)=>{
        const cadastroRestauranteRows = await db.Restaurante.findAll();   
       // const messages = await req.consumeFlash('success')
        res.render('listagemRestaurante', {restaurantes: cadastroRestauranteRows})
    },

    viewCadastrarRestaurante: async(req,res)=>{
        res.render('cadastrarRestaurante', {formAction:"cadastrarRestaurante", restaurante:{}})
    },

    acaoCadastrarRestaurante: async(req,res) =>{
        const restauranteNome = req.body.restaurante_nome
        const restauranteTipo = req.body.restaurante_tipo
        const restauranteTelefone = req.body.restaurante_telefone
        const restauranteEmail = req.body.restaurante_email
        const restauranteCardapio = req.body.restaurante_cardapio
        const restauranteHorarioFuncionamento = req.body.restaurante_horario_funcionamento
        const restauranteEndereco = req.body.restaurante_endereco
        const restauranteEnderecoNumero = req.body.restaurante_endereco_numero
        const restauranteEnderecoNumeroComplemento = req.body.restaurante_endereco_numero_complemento
        const restauranteEnderecoBairro = req.body.restaurante_endereco_bairro
        const restauranteEnderecoCidade = req.body.restaurante_endereco_cidade
        const restauranteEnderecoEstado = req.body.restaurante_endereco_estado
        const restauranteEndereCep= req.body.restaurante_endereco_cep
        const restauranteImagem = req.file.filename
        const restauranteDescricao = req.body.restaurante_descricao
        
        await db.Restaurante.create({
            restaurante_nome: restauranteNome,
            restaurante_tipo: restauranteTipo,
            restaurante_telefone: restauranteTelefone,
            restaurante_email: restauranteEmail,
            restaurante_cardapio: restauranteCardapio,
            restaurante_horario_funcionamento: restauranteHorarioFuncionamento,
            restaurante_endereco: restauranteEndereco,
            restaurante_endereco_numero: restauranteEnderecoNumero,
            restaurante_endereco_numero_complemento: restauranteEnderecoNumeroComplemento,
            restaurante_endereco_bairro: restauranteEnderecoBairro,
            restaurante_endereco_cidade:restauranteEnderecoCidade,
            restaurante_endereco_estado:restauranteEnderecoEstado,
            restaurante_endereco_cep: restauranteEndereCep,
            restaurante_imagem: restauranteImagem,
            restaurante_descricao: restauranteDescricao,
            
        })

        //await req.flash('success', "Registro criado com sucesso")

        res.redirect("/restaurante/listagemRestaurante")   
    },

    editar: async (req, res)=> {
        const restauranteEncontrato = await db.Restaurante.findByPk(req.params.id);

       // restauranteEncontrato.dataFormatada = `${restauranteEncontrato.data_nascimento.getFullYear()}-${('0' + restauranteEncontrato.data_nascimento.getMonth() + 1).slice(-2)}-${('0' + (restauranteEncontrato.data_nascimento.getDate())).slice(-2)}`;
        console.log(restauranteEncontrato);

        res.render("cadastrarRestaurante", {
            formAction:`/alterar/${req.params.id}`,
            buttonMessage: "Salvar",
            restaurante: restauranteEncontrato
        });

    },

    acaoEditar: async (req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const restauranteEncontrado = await db.Restaurante.findByPk(req.params.id);          
            const alert = listaDeErros.array()
            console.log(alert)

            res.render("cadastrarRestaurante", {alert: alert, formAction:`/alterar/${req.params.id}`,
            buttonMessage: "Salvar", restaurante: restauranteEncontrado})
            return            
        }

        const restauranteObj = { 
            restaurante_nome: restauranteNome,
            restaurante_tipo: restauranteTipo,
            restaurante_telefone: restauranteTelefone,
            restaurante_email: restauranteEmail,
            restaurante_cardapio: restauranteCardapio,
            restaurante_horario_funcionamento: restauranteHorarioFuncionamento,
            restaurante_endereco: restauranteEndereco,
            restaurante_endereco_numero: restauranteEnderecoNumero,
            restaurante_endereco_numero_complemento: restauranteEnderecoNumeroComplemento,
            restaurante_endereco_bairro: restauranteEnderecoBairro,
            restaurante_endereco_cidade:restauranteEnderecoCidade,
            restaurante_endereco_estado:restauranteEnderecoEstado,
            restaurante_endereco_cep: restauranteEndereCep,
            restaurante_imagem: restauranteImagem,
            restaurante_descricao: restauranteDescricao
        }

        await db.Restaurante.update(restauranteObj, {where: {id: req.params.id}})

        //await req.flash('success', "Registro editado com sucesso")

        res.redirect("/")
    },

    excluir: async (req, res)=> {
        const idRestaurante = req.params.id;
        
        await req.flash('success', "Registro excluido com sucesso")
        await db.Restaurante.destroy({where: {id: idRestaurante}})
        res.redirect("/restaurante/listagemRestaurante")
    }
}

module.exports = restauranteController
