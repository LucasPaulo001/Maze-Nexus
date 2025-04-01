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

//Rota para modificações de dados do usuário
routerProfile.post('/edit/profile/:userId', async (req, res) => {
    try{
        const { userId } = req.params
        const { bioData, username } = req.body

        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({message: 'Usuário não encontrado'})
        }

        user.bio = bioData
        user.name = username

        await user.save()

        res.status(200).json({message: 'Biografia adicionada', ok: true, bioData, username})


    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor'})
    }
})

//Rota para salvar postagens
routerProfile.post('/profile/:userId/post/:postId', async (req, res) => {
    try{
        const { userId, postId } = req.params

        //Buscando postagem
        const post = await Post.findById(postId)

        if(!post){
            return res.status(404).json({message: 'Postagem não encontrada'})
        }

        //Salvando id da postagem no schema de usuário
        const user = await User.findByIdAndUpdate(userId, 
            { $addToSet: { postsSaves: postId } },
            { new: true }
        )
        .populate('author', 'name username')

        if(!user){
            return res.status(404).json({message: 'Usuário não encontrado'})
        }
         
        res.status(200).json({message: 'Post salvo com sucesso', ok: true, post})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor'})
    }
})

//Rota para informar postagens salvas
routerProfile.get('/profile/:userId/savedPosts', async (req, res) => {
    try{
        const { userId } = req.params

        //Buscando usuário
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({message: 'Usuário não encontrado'})
        }

        //Verificando se tem algum post salvo
        if(!user.postsSaves || user.postsSaves.length === 0){
            return res.status(200).json({ message: 'Nenhum post salvo', posts: [] })
        }

        //Filtrando os posts salvos a partir do array de ids 
        const savedPosts = await Post.find({ _id: { $in: user.postsSaves } })
        .populate('author', 'name username')

        res.status(200).json({message: 'Posts salvos encontrados: ', posts: savedPosts})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor'})
    }
})

export default routerProfile