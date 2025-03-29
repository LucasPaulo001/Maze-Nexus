import mongoose, { Schema } from "mongoose"

const PostSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Comentários
    comments: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        comment: {type: String, required: true},
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        // Respostas para os comentários
        responses: [{
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            response: {type: String, required: true},
            likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
            createdAt: {type: Date, default: Date.now}
        }],
        createdAt: { type: Date, default: Date.now }
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

export default mongoose.model('Post', PostSchema)