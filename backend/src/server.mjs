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
app.use(cors())

//Conexão ao banco de dados
connectDB(app)

//Importação de rotas
import routerRegister from './routes/register.mjs'

app.use('/user', routerRegister)

//Inicialização do servidor
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Conectado ao servidor na porta: ${PORT}`)
})