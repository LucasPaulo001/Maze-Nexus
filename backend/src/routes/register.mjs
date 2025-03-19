import express from 'express'
import User from '../models/User.mjs'
const routerRegister = express.Router()


//Rota para recebimento de dados de cadastro
routerRegister.post('/register', async (req, res) => {
    const { name, username, email, password, dateBirth } = req.body

    try{
        const newUser = await new User({
            name,
            username,
            email,
            dateBirth,
            password
        })
        await newUser.save()
    
        return res.status(200).json({message: 'Usuário cadastrado com sucesso!'})
    }
    catch{
       return res.status(400).json({message: 'Erro ao cadastrar usuário!'})
    } 
})

//Rota para verificar nome de usuário
routerRegister.post('/checkName', async (req, res) => {
    const { username } = req.body

    try{
        const userExist = await User.findOne({username})
        if(userExist){
            console.log('já existe')
            return res.json({available: false})
        }
        console.log('não existe')
        return res.json({available: true})
    }
    catch{
        console.log('Erro ao tentar verificar nome de usuário')
        return res.status(500).json({ error: 'Erro interno no servidor' })
    }
})

export default routerRegister