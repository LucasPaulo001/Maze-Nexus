import express from 'express'
import User from '../models/User.mjs'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const routerRegister = express.Router()


//Rota para recebimento de dados de cadastro
routerRegister.post('/register', async (req, res) => {
    const { name, username, email, password, dateBirth } = req.body

    //Criptografia de senha
    const houndSaults = 10
    const hashPass = await bcrypt.hash(password, houndSaults)

    //Senha de validação
    const length = 4
    const verificationCode = crypto.randomBytes(length).toString('hex').toUpperCase().slice(0, length)

    //Token único para acesso a página de validação
    const tokenVerification = crypto.randomBytes(32).toString('hex')

    //Tempo para expirar
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000)

    //Verificando se usuário já está cadastrado
    const existEmail = await User.findOne({email})
    if(existEmail){
        return res.status(400).json({message: 'E-mail já cadastrado!'})
    }

    //Salvando usuário no banco de dados
    try{
        const newUser = await new User({
            name,
            username,
            email,
            dateBirth,
            password: hashPass,
            verificationCode,
            tokenVerification,
            verificationCodeExpires,
            isVerified: false
        })

        await newUser.save()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASS_USER,
            }
        })

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Validação de conta Maze-Nexus',
            html: `
                <!DOCTYPE html>
                <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Código de Verificação - Maze Nexus</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f9f9f9;
                            margin: 0;
                            padding: 0;
                            color: #333;
                        }
                        .email-container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        h1 {
                            color: #4CAF50;
                            font-size: 24px;
                            margin-bottom: 15px;
                        }
                        p {
                            font-size: 16px;
                            line-height: 1.6;
                            margin-bottom: 20px;
                        }
                        .button {
                            display: inline-block;
                            background-color: #4CAF50;
                            color: #fff;
                            padding: 12px 24px;
                            font-size: 16px;
                            text-align: center;
                            text-decoration: none;
                            border-radius: 4px;
                            margin: 10px 0;
                        }
                        .footer {
                            text-align: center;
                            font-size: 14px;
                            color: #888;
                            margin-top: 20px;
                        }
                        .footer a {
                            color: #4CAF50;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="header">
                            <h1>Código de Verificação - Maze Nexus</h1>
                        </div>
                        <p>Olá,</p>
                        <p>Para completar o seu cadastro no Maze Nexus, insira o código de verificação abaixo:</p>
                        <h2 style="font-size: 32px; font-weight: bold; color: #4CAF50;">${verificationCode}</h2>
                        <p>Esse código é válido por 10 minutos. Caso não tenha solicitado o cadastro, ignore este e-mail.</p>
                        
                        <div class="footer">
                            <p>Atenciosamente,</p>
                            <p><strong>Equipe Maze Nexus</strong></p>
                            <p>Se você tiver algum problema, entre em contato conosco pelo e-mail <a href="mailto:support@mazenexus.com">support@mazenexus.com</a>.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        })
    
        return res.status(200).json({message: 'Usuário cadastrado com sucesso!', tokenVerification})
    }
    catch{
       return res.status(400).json({message: 'Erro ao cadastrar usuário!'})
    } 
})

//Rota para verificar nome de usuário
routerRegister.post('/checkName', async (req, res) => {
    const { username } = req.body

    try{
        const userExist = await User.findOne({username})
        if(userExist){
            console.log('já existe')
            return res.json({available: false})
        }
        console.log('não existe')
        return res.json({available: true})
    }
    catch{
        console.log('Erro ao tentar verificar nome de usuário')
        return res.status(500).json({ error: 'Erro interno no servidor' })
    }
})


export default routerRegister