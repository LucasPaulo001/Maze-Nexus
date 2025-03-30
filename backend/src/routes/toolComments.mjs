import express, { response } from 'express'
import Post from '../models/Post.mjs'
import Comments from '../models/Comments.mjs'
import Response from '../models/Response.mjs'

const routerToolPost = express.Router();

//Rota para deletar comentários
routerToolPost.delete('/post/:postId/delete/:commentId', async (req, res) => {
    try {

        const { postId, commentId } = req.params

        // Deletando o comentário do banco
        const comment = await Comments.findByIdAndDelete(commentId)

        if (!comment) {
            return res.status(404).json({ message: 'Comentário não encontrado!' })
        }

        //Deletando comentário do schema de post
        const post = await Post.findByIdAndUpdate(postId,
            {$pull: { comments: commentId }},
            {new: true}
        )

        if(!post){
            return res.status(404).json({message: 'Postagem não encontrada!'})
        }

        res.json({ message: 'Comentário deletado com sucesso!', ok: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro interno do servidor' })
    }
})


//Rota para editar comentário
routerToolPost.put('/comment/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params
        const { newComment } = req.body

        // Buscando o comentário no banco
        const comment = await Comments.findById(commentId)

        if (!comment) {
            return res.status(404).json({ message: 'Comentário não encontrado!' })
        }

        // Atualizando o comentário
        comment.comment = newComment
        await comment.save()

        res.json({ message: 'Comentário editado com sucesso!', ok: true, newComment })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro interno do servidor!' })
    }
})


//Rota para responder comentários
routerToolPost.post('/comment/:commentId/response', async (req, res) => {
    try {
        const { commentId } = req.params
        const { userId, response } = req.body

        // Buscando o comentário no banco
        const comment = await Comments.findById(commentId)
        .populate('userId', 'name username')

        if (!comment) {
            return res.status(404).json({ message: 'Comentário não encontrado!' })
        }

        // Criando a resposta
        const newResponse = new Response({
            response: response,
            userId: userId,
            commentId: commentId
        })

        // Salvando a resposta
        await newResponse.save()

        // Atualizando o comentário para adicionar a nova resposta
        comment.responses.push(newResponse._id)
        await comment.save()

        res.json({ message: 'Resposta adicionada com sucesso!', newResponse, ok: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro interno do servidor!' })
    }
})

//Rota para buscar as respostas
routerToolPost.get('/comment/:commentId/responses', async (req, res) => {
    try{
        const { commentId } = req.params

        //Buscando comentário e populando dados
        const comment = await Comments.findById(commentId)
        .populate({
            path: 'responses',
            populate: {
                path: 'userId',
                select: 'name username'
            }
        })

        if(!comment){
            return res.status(404).json({message: 'Comentário não encontrado!'})
        }

        res.status(200).json({newResponse: comment.responses})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor!'})
    }
})

//Rota para deletar respostas
routerToolPost.delete('/comment/:commentId/response/:responseId', async (req, res) => {
    try{
        const { commentId, responseId } = req.params

        //Deletando resposta do comentário
        const comment = await Comments.findByIdAndUpdate(commentId, {
            $pull: { responses: responseId }
        }, { new: true })

        if(!comment){
            return res.status(404).json({message: 'Comentário não encontrado!'})
        }
        
        //Deletando resposta
        const response = Response.findByIdAndDelete(responseId)

        if(!response){
            return res.status(404).json({message: 'Resposta não encontrada!'})
        }

        res.status(200).json({message: 'Resposta deletada com sucesso!'})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor!'})
    }
})

//Rota para editar respostas
routerToolPost.put('/response/:idRes', async (req, res) => {
    try{
        const { idRes } = req.params
        const { newRes } = req.body

        const response = await Response.findByIdAndUpdate(idRes, 
            { response: newRes },
            {new: true}
        )

        if(!response){
            return res.status(404).json({message: 'Resposta não encontrada!'})
        }

        res.status(200).json({message: 'Resposta editada com sucesso!', ok: true})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor!'})
    }
})

export default routerToolPost