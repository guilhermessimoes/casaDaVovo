const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const db = require('../models'); 
const jwt = require('jsonwebtoken');


const loginController = {
    signupGet: async(_req,res)=>{
        res.render("registrarUsuario", {formAction:"/login/signup", usuario:{}})
    },
    signupPost: async(req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const alert = listaDeErros.array()
            res.render("login/signup", {alert: alert, formAction:"/login/signup"})
            return            
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
     
        res.render('login', {formAction:"/login", messages: messages }) 
    },

    loginPost: async(req,res)=>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const alert = listaDeErros.array()
            res.render("login", {alert: alert, formAction:"/login"})
            return            
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
          return res.render("login", { error: "Usuário ou senha incorretos" });
        }
      
        const comparePassword = bcrypt.compareSync(senha, user.senha);
        if (!comparePassword) {
          return res.render("login", { error: "Usuário ou senha incorretos" });
        }
        

        //Adicionar session 
        req.session.usuario = {
          user_id: user.id,
          name: user.nome,
          email: user.email,
        };
        
        res.redirect("/")

       /* // Authenticate User
        try {
          const accessToken =  jwt.sign({userId: db.Usuario.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 300000})          
          //res.status(200).json({msg:'Autenticação realizada com sucesso.', accessToken: accessToken});
          //console.log(accessToken)
          res.render("index", {accessToken: accessToken});
        } catch (error) {
          console.log(error);
          res.status(500).json({msg:'problema no servidor'})
        }*/
      
    },
}

module.exports = loginController