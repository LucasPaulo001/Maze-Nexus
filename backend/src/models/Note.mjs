import mongoose, { Schema } from 'mongoose'

const NoteSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    studyId: {
        type: mongoose.Schema.Types.ObjectId
    },
    notes: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Note', NoteSchema)