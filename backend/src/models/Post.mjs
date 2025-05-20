import mongoose, { Schema } from "mongoose"


const PostSchema = new Schema({
    title: String,
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], 
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

export default mongoose.model('Post', PostSchema)
