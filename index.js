// config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()


// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// Rotas da API
const funcionariosRoutes = require('./routes/funcionariosRoutes')

app.use('/funcionarios', funcionariosRoutes)

// rota inicial / endpoint
app.get('/', (req, res) => {

    // mostrar req

    res.json({message: 'Oi Express!'})

})

const DB_user = process.env.DB_user
const DB_password = encodeURIComponent(process.env.DB_password)

// entregar porta
mongoose.connect(
    `mongodb+srv://${DB_user}:${DB_password}@apicluster.rf1w4.mongodb.net/?retryWrites=true&w=majority&appName=APICluster`
)

.then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})
.catch(err => console.log(err))