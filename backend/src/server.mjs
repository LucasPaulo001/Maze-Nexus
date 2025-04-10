//Importação de módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db/connect.mjs'

//Configuração de variáveis de ambiente e função express
dotenv.config()
const app = express()

//Configuração de tratamento de dados
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: ['http://localhost:5173', 'https://maze-nexus-front-end.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Authorization']
}))

app.options('*', cors())

//Middleware de configuração de cabeçalhos
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});


//Conexão ao banco de dados
connectDB(app)

//Importação de rotas
import routerRegister from './routes/register.mjs'
import routerLogin from './routes/login.mjs'
import routerPost from './routes/posts.mjs'
import routerToolPost from './routes/toolComments.mjs'
import routerProfile from './routes/profile.mjs'
import routerStudy from './routes/studiesTools.mjs'

app.use('/user', routerRegister)
app.use('/user', routerLogin)
app.use('/user', routerPost)
app.use('/user', routerToolPost)
app.use('/user', routerProfile)
app.use('/user', routerStudy)

//Inicialização do servidor
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Conectado ao servidor na porta: ${PORT}`)
})