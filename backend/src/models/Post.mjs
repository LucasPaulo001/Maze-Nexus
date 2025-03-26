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
    }
})

export default mongoose.model('Post', PostSchema)