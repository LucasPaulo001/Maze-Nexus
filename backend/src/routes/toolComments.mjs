import express from 'express'
import Post from '../models/Post.mjs'
const routerToolPost = express.Router()


//Rota para excluir comentário
routerToolPost.delete('/post/:postId/delete/:commentId', async (req, res) => {
    try{
        const {postId, commentId} = req.params
        
        //Buscando postagem
        const post = await Post.findById(postId)

        if(!post){
            return res.status(404).json({message: 'Postagem não encontrada!'})
        }

        //Buscando comentário a partir da postagem
        const comment = post.comments.id(commentId)

        if(!comment){
            return res.status(404).json({message: 'Comentário não encontrado!'})
        }

        //Deletando comentário buscado
        comment.deleteOne()

        await post.save()

        res.json({message: 'Comentário deletado com sucesso!', ok: true})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor'})
    }
})

//Rota para editar comentário
routerToolPost.put('/post/:postId/:commentId', async (req, res) => {
    try{
        const { postId, commentId } = req.params
        const { newComment } = req.body

        const post = await Post.findById(postId)

        if(!post){
            res.status(404).json({message: 'Postagem não encontrada!'})
        }

        const oldComment = post.comments.id(commentId)

        oldComment.comment = newComment

        await post.save()

        res.json({message: 'Comentário editado com sucesso!', ok: true, newComment})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor!'})
    }
})


export default routerToolPost