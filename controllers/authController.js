const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const db = require('../models'); 
const jwt = require('jsonwebtoken');


const loginController = {
    signupGet: async(_req,res)=>{
        res.render("registrarUsuario", {formAction:"/login/signup", usuario:{}, message:''})
    },
    signupPost: async(req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const alert = listaDeErros.array()
            return res.render("registrarUsuario", {alert: alert, formAction:"/login/signup", message:''})
        }

        const nomeUsuario = req.body.nome;
        const emailUsuario = req.body.email;
        const senhaUsuario = req.body.senha;
        const confirmSenha = req.body.confirmacaoSenha;
        const salt = bcrypt.genSaltSync(10);
        const senhaCriptografada = bcrypt.hashSync(req.body.senha, salt);

       
        if (senhaUsuario !== confirmSenha) {          
            return res.render("registrarUsuario", { formAction:"/login/signup", message: "Senhas não conferem" });
        }        
        
        if (await db.Usuario.findOne({where: { email: emailUsuario}})) {            
            return res.render('registrarUsuario',{ formAction:"/login/signup", message: 'Email já existe'})
        }        
        try {  
          const user = await db.Usuario.create({
              nome: nomeUsuario,
              email: emailUsuario,
              senha: senhaCriptografada
          })

          await req.flash('success', "Registro criado com sucesso")
          res.redirect("/login") 
          
        } catch (error) {
          res.status(400).send('error, falha na criação do usuario.')
        }
    },

    loginGet: async(req,res)=>{
      const messages = await req.consumeFlash('success')
     
        res.render('login', {formAction:"/login", messages: messages,  verifyUser:'' }) 
    },

    loginPost: async(req,res)=>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const alert = listaDeErros.array()
            return res.render("login", {alert: alert, verifyUser:'', messages: 0, formAction:"/login"})
        }

        const { email, senha } = req.body;

        const user = await db.Usuario.findOne({ where: { email: email } })
          .then((user) => {
            return user;            
          })
          .catch((err) => {
            console.log(err);
            return undefined;
          });
          
        
         
        if (!user) {
          return res.render("login", { verifyUser: "Usuário ou senha incorretos" , messages: 0, formAction:"/login"});
        }
      
        const comparePassword = bcrypt.compareSync(senha, user.senha);
        if (!comparePassword) {
          return res.render("login", { verifyUser: "Usuário ou senha incorretos", messages: 0, formAction:"/login" });
        }
        

        //Adicionar session 
        req.session.usuario = {
          user_id: user.id,
          name: user.nome,
          email: user.email,
        };
        
        res.redirect("/")
      
    },
}

module.exports = loginController