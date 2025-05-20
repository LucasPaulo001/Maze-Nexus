import mongoose, { Schema } from "mongoose"

const StudieSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    schedule: [{
        subject: {
            type: String,
            required: true
        },
        day: {
            type: String,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        reminder: { 
            type: Boolean,
            default: false 
        }
    }]
}, { timestamps: true })

export default mongoose.model('Studie', StudieSchema)