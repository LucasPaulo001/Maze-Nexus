import express from 'express'
import Post from '../models/Post.mjs'
const routerPost = express.Router()

//Rota para postagem no feed
routerPost.post('/post', async (req, res) => {
    try{
        const { title, content, idUser } = req.body

        //Salvando a postagem no banco de dados
        const newPost = await new Post({
            title,
            content,
            author: idUser
        })
        .populate('author', 'username')

        await newPost.save()

        res.json({message: 'Postagem feita com sucesso!', ok: true, post: newPost})
    }
    catch(error){
        res.status(500).json({message: 'Erro interno, tente novamente mais tarde!'})
        console.log(error)
    }
})

//Rota para listar os posts

routerPost.get('/posts', async (req, res) => {
    try{
        const posts = await Post.find()
        .populate('author', 'username')
        console.log(posts)
        res.json({posts, ok: true})
    }
    catch(error){
        res.status(500).json({message: 'Erro interno ao informar postagens'})
        console.log(error)
    }
})


export default routerPost