import mongoose, { Schema } from "mongoose"

const UserSchema = Schema({
    name: { type: String, required: true },
    username: { type: String, required: false, unique: true },
    email: { type: String, required: true, unique: true },
    password: { 
        type: String, 
        required: function () { return !this.googleId; }, 
    },
    googleId: { 
        type: String, 
        unique: true, 
        sparse: true 
    },
    bio: {
        type: String,
        required: false
    },
    postsSaves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        require: false
    }],
    googleProfilePicture: { 
        type: String, 
        required: false 
    },
    dateBirth: { type: Date, required: false },
    verificationCode: { type: Number, required: false },
    verificationCodeExpires: { type: Date, required: false },
    tokenVerification: { type: String, required: false },
    isVerified: { type: Boolean, default: false }, 
}, {
    timestamps: true, 
})

export default mongoose.model('User', UserSchema)
