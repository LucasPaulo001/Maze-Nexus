import express from 'express'
import User from '../models/User.mjs'
import Post from '../models/Post.mjs'
const routerProfile = express.Router()


//Rota para listar dados
routerProfile.get('/profile/:userId', async (req, res) => {
    try{
        const { userId } = req.params

        const userData = await User.findById(userId)

        if(!userData){
            return res.status(404).json({message: 'Usuário não encontrado!'})
        }

        res.status(200).json({message: 'Dados do usuário encontrados!', userData, ok: true})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor!'})
    }
})

//Rota para buscar postagens do usuário
routerProfile.get('/myPosts/:userId', async (req, res) => {
    try{
        const { userId } = req.params

        const posts = await Post.find({author: userId})
        .populate('author', 'name username')

        if(!posts){
            return res.status(404).json({message: 'Postagem não encontrada'})
        }

        res.status(200).json({posts, ok: true})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor!'})
    }
})


export default routerProfile