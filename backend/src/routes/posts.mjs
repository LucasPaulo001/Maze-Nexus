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

//Rota para excluir posts

routerPost.post('/delete/post/:id', async (req, res) => {
    try{
        const { id } = req.params

        const post = await Post.findByIdAndDelete(id)

        if(!post){
           return res.json({message: 'Postagem não encontrada!'})
        }

        res.json({message: 'Post deletado com sucesso!', post, id, ok: true})
    }
    catch(error){
        res.status(500).json({message: 'Erro interno, por favor tente novamente!'})
        console.log(error)
    }
})

//Rota para editar postagens

routerPost.post('/update/post/:id', async (req, res) => {
    try{
        const { id } = req.params
        const { title, content } = req.body

        const attPost = await Post.findByIdAndUpdate(id, 
        {content: content, title: title}, 
        { new: true })
        .populate('author', 'username')

        if(!attPost){
            return res.json({message: 'Postagem não encontrada!'})
        }

        res.json({message: 'Postagem atualizada com sucesso!', attPost, ok: true})
    }
    catch(error){
        res.status(500).json({message: 'Erro interno, tente novamente!'})
        console.log(error)
    }
})

//Rota para likes

routerPost.post('/like/post/:postId', async (req, res) => {
    try{
        const { postId } = req.params
        const { userId } = req.body

        const post = await Post.findById(postId)

        if(!post){
            return res.status(404).json({message: 'Postagem não encontrada!'})
        }

        const alreadyLike = post.likes.includes(userId)

        if(alreadyLike){
            await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } })
            res.json({message: 'Like removido!',likeCount: post.likes.length - 1, liked: false})
        }
        else{
            await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } })
            res.json({message: 'Like adicionado!', likeCount: post.likes.length + 1, liked: true})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno, por favor tente novamente mais tarde!'})
    }

})


export default routerPost