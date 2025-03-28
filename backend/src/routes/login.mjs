import express from "express";
import User from "../models/User.mjs"; // Importa o modelo atualizado
import { OAuth2Client } from "google-auth-library";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
dotenv.config()

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//Login com o google
router.post("/google-login", async (req, res) => {
    try {

        console.log('Corpo da requisição: ', req.body)
        const { credential } = req.body; 

        // Verifica e decodifica o token do Google
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        console.log("🔹 Payload do Google:", payload);

        // Verifica se o usuário já existe no banco de dados
        let user = await User.findOne({ email: payload.email });

        if (!user) {
            // Se não existir, cria um novo usuário com os dados do Google
            user = new User({
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                googleId: payload.sub, 
                isVerified: true,
                password: "",
            });

            await user.save();
            console.log("✅ Usuário salvo no banco:", user);
        }

        //Gerando token
        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        )
    
        res.status(200).json({ message: "Login bem-sucedido!", success: true, user, token });
    } catch (error) {
        console.error("Erro no login com Google:", error);
        res.status(500).json({ message: "Erro ao processar login com Google" });
    }
});

//Rota para login com email e senha
router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.json({message: 'Usuário não encontrado!'})
        }

        if(!user.isVerified){
            return res.json({message: 'Usuário não autênticado, verifique seu E-mail para mais informações!'})
        }
        
        const okPass = await bcrypt.compare(password, user.password)
        if(!okPass){
            return res.json({message: 'Senha incorreta!'})
        }

        //Gerando token
        let ok = true
        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        )
        res.json({message: 'login feito com sucesso!', token, ok})
        
    }
    catch(error){
        res.status(400).json({message: 'Erro ao fazer login'})
        console.log(error)
    }
})

export default router;
