import express from 'express'
import Post from '../models/Post.mjs'
import Comments from '../models/Comments.mjs'

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
        .populate('author', '_id name username')

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
        .populate('author', 'name username')
        .populate('likes')
        res.json({posts, ok: true})
    }
    catch(error){
        res.status(500).json({message: 'Erro interno ao informar postagens'})
        console.log(error)
    }
})

//Rota para excluir posts
routerPost.delete('/delete/post/:id', async (req, res) => {
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
routerPost.put('/update/post/:id', async (req, res) => {
    try{
        const { id } = req.params
        const { title, content } = req.body

        const attPost = await Post.findByIdAndUpdate(id, 
        {content: content, title: title}, 
        { new: true })
        .populate('author', 'username name')

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

        let post = await Post.findById(postId)
        

        if(!post){
            return res.status(404).json({message: 'Postagem não encontrada!'})
        }

        const alreadyLike = post.likes.includes(userId)

        if(alreadyLike){
            await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } })
        }
        else{
            await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } })
        }

        post = await Post.findById(postId)

        res.json({
            message: alreadyLike ? 'Like removido!' : 'Like adicionado!',
            likeCount: post.likes.length, // Agora refletindo o valor atualizado
            liked: !alreadyLike,
            likes: post.likes // Retornando a lista atualizada de likes
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno, por favor tente novamente mais tarde!'})
    }
})

//Rota para comentários
routerPost.post('/post/:postId/comment', async (req, res) => {
    try {
        const { postId } = req.params
        const { userId, comment } = req.body

        const newComment = new Comments({ postId, userId, comment })
        await newComment.save()

        // Adicionar o ID do comentário ao post
        await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } })

        res.json({ message: 'Comentário adicionado com sucesso!', ok: true, newComment })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro interno do servidor!' })
    }
})


//Rota para buscar comentários
routerPost.get('/post/:postId/comment', async (req, res) => {
    try {
        const { postId } = req.params

        const comments = await Comments.find({ postId })
        .populate('userId', 'name username')
        res.json({ comments, ok: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro interno do servidor!' })
    }
})


//Rota para curtir comentários
routerPost.post('/comment/:commentId/like', async (req, res) => {
    try{
        const { commentId } = req.params
        const { userId } = req.body

        const comment = await Comments.findById(commentId)

        if(!comment){
            return res.status(404).json({message: 'Comentário não encontrado!'})
        }

        const alreadyLike = comment.likes.includes(userId)

        if(alreadyLike){
            comment.likes = comment.likes.filter(id => id.toString() !== userId)
            //res.json({liked: false})
        }
        else{ 
            comment.likes.push(userId)
            //res.json({liked: true})
        }

        await comment.save()
        const newLike = comment.likes.length

        res.json({message: 'Like adicionado ao comentário', ok: true, liked: true, newLike})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno!'})
    }
})


export default routerPost