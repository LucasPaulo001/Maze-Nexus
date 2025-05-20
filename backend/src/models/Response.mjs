import mongoose, { Schema } from 'mongoose'

const ResponseSchema = new Schema({
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    response: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Response', ResponseSchema);
