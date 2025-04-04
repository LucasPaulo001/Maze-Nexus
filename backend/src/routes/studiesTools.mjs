import express from 'express'
import Studies from '../models/Studies.mjs'
const routerStudy = express.Router()

//Rota para criar horário de estudos
routerStudy.post('/profile/studies/:userId', async (req, res) => {
    try{
        const { userId } = req.params
        const {newStudy} = req.body

        let userStudies = await Studies.findOne({userId})

        if(userStudies){
            userStudies.schedule.push(newStudy)
            await userStudies.save()
        }
        else{
            userStudies = new Studies({
                userId,
                schedule: [newStudy],
            })
            await userStudies.save()
        }

        res.status(200).json({message: 'Salvo com sucesso', userStudies})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor'})
    }
})

//Rota para buscar horários
routerStudy.get('/profile/studies/:userId', async (req, res) => {
    try{
        const { userId } = req.params

        const studies = await Studies.findOne({userId})

        if(!studies){
            res.status(404).json({message: 'Estudos não encontrados'})
        }

        res.status(200).json({message: 'Estudos encontrados', studies})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor'})
    }
})

//Rota para deletar estudos
routerStudy.delete('/profile/:userId/deleteStudy/:studyId', async (req, res) => {
    try{
        const { userId, studyId } = req.params

        const studies = await Studies.findOneAndUpdate(
            { userId }, 
            { $pull: {
                schedule: {
                    _id: studyId
            }}  },
            {new: true}
        )

        if(!studies){
            return res.status(404).json({ message: 'Estudo não encontrado' })
        }

        res.status(200).json({ message: 'Horário deletado com sucesso!', studies })

    }
    catch(error){
        console.log(error)
        res.status(500).json({ message: 'Erro interno do servidor' })
    }
})

export default routerStudy