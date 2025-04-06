import express from 'express'
import Studies from '../models/Studies.mjs'
import Note from '../models/Note.mjs'
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

//Rota para salvar anotações
routerStudy.post('/profile/:userId/schedule/:id/note', async (req, res) => {
    try{
        const { userId, id } = req.params
        const { notes } = req.body

        const newNote = new Note({
            userId: userId,
            studyId: id,
            notes: notes
        })

        await newNote.save()

        res.status(200).json({message: 'Anotação salva', newNote})
    }
    catch(error){
        console.log(error)
        res.status(505).json({message: 'Erro interno do servidor'})
    }
})

//Rota para buscar anotações
routerStudy.get('/profile/:userId/schedule/note', async (req, res) => {
    try{
        const { userId } = req.params

        const notes = await Note.find({userId: userId})

        if(!notes){
            return res.status(404).json({ message: 'Anotação não encontrada' })
        }

        const studyIds = notes.map(note => note.studyId)
        
        const  studies = await Studies.findOne({ userId })

        const scheduleMap = {}

        studies.schedule.forEach(item => {
          scheduleMap[item._id.toString()] = item
        })
    
        // Enriquecer cada anotação com o item correspondente da matéria
        const notesWithSubjects = notes.map(note => {
          const studyInfo = scheduleMap[note.studyId.toString()]
          return {
            ...note.toObject(),
            subject: studyInfo ? studyInfo.subject : null,
            fullStudyItem: studyInfo || null
          }
        })
    
        res.status(200).json({ message: 'Anotações encontradas', notes: notesWithSubjects })
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor'})
    }
})

export default routerStudy