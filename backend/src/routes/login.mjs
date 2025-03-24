import express from "express";
import User from "../models/User.mjs"; // Importa o modelo atualizado
import { OAuth2Client } from "google-auth-library";
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google-login", async (req, res) => {
    try {

        console.log('Corpo da requisição: ', req.body)
        const { credential } = req.body; // Token JWT do Google enviado pelo frontend

        if (!credential) {
            console.log("❌ Token JWT ausente!");
            return res.status(400).json({ message: "Token JWT ausente" });
        }

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
                googleId: payload.sub, // Armazena o ID do Google
                isVerified: true,
                password: "", // Usuário do Google não precisa de senha
            });

            await user.save();
            console.log("✅ Usuário salvo no banco:", user);
        }

        // Aqui você pode gerar um token JWT para autenticação no seu sistema
        res.status(200).json({ message: "Login bem-sucedido!", success: true, user });
    } catch (error) {
        console.error("Erro no login com Google:", error);
        res.status(500).json({ message: "Erro ao processar login com Google" });
    }
});

export default router;
