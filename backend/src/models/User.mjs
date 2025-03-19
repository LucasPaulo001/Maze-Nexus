import mongoose, { Schema } from "mongoose"

const UserSchema = Schema({
    name: {type: String, required: true},
    username: {type: String, require: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    dateBirth: {type: Date, required: true}
})

export default mongoose.model('User', UserSchema)