import mongoose, { Schema } from 'mongoose'

const CommentSchema = new Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Response' }],
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Comment', CommentSchema)
