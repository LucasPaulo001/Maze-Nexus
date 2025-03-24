import mongoose, { Schema } from "mongoose";

const UserSchema = Schema({
    name: { type: String, required: true },
    username: { type: String, required: false, unique: true },
    email: { type: String, required: true, unique: true },
    password: { 
        type: String, 
        required: function () { return !this.googleId; }, // Obrigatório se não for login Google
    },
    googleId: { 
        type: String, 
        unique: true, 
        sparse: true // Permite que o googleId seja único sem validar se o campo está vazio
    },
    googleProfilePicture: { 
        type: String, 
        required: false // Caso você queira armazenar a foto de perfil do Google
    },
    dateBirth: { type: Date, required: false },
    verificationCode: { type: String, required: false },
    verificationCodeExpires: { type: Date, required: false },
    tokenVerification: { type: String, required: false },
    isVerified: { type: Boolean, default: false }, // Para verificar se o e-mail foi validado
}, {
    timestamps: true, // Garante que os campos createdAt e updatedAt sejam gerenciados automaticamente
});

export default mongoose.model('User', UserSchema);
