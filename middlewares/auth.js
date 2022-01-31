const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require('../models'); 

const authMidllewareToken = async (req, res, next) =>{ 
    const id = req.params.id              
    const user = await db.Usuario.findByPk(id)
    console.log(user)
    if (!user) {
        return res.status(401).json({msg:'Usuario nao encontrado'})        
    }
  
     const authHeader = req.headers.authorization
     
     const [, token] = authHeader.split(' ')
     if (!token) {        
         return res.status(401).json({msg:'Acesso negado'})
     }

     try {       
       const secret = process.env.ACCESS_TOKEN_SECRET
       console.log(secret)          
       jwt.verify(token, secret, (error, decoded)=>{
            req.userId = decoded.id            
            return next()
        })  
        
     } catch (error) {
         
         res.status(401).json({msg: "token invalido"})
     }
}

module.exports = {authMidllewareToken}