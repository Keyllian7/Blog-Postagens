// Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path');
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

// Configurações

    // Dotenv
    require('dotenv').config();

    // Sessão
    app.use(session({
        secret: process.env.SECRET_PASSWORD,
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    // Middleware
    app.use((req, res, next) => {
        res.locals.mensagem_sucesso = req.flash("mensagem_sucesso")
        res.locals.mensagem_erro = req.flash("mensagem_erro")
        next()
    })


    // Body parse
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    // Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main',
        runtimeOptions: {allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true}}));
    app.set('view engine', 'handlebars');

    // Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/blogapp').then(() => {
            console.log("Conectado ao banco de dados com sucesso!")
        }).catch((err) => {
            console.log("Erro ao se conectar ao banco de dados: " + err)
        })

    // Public
    app.use(express.static(path.join(__dirname, "public")))

    // Outras configurações
    app.use((req, res, next) => {
        console.log("Middleware ativo!")
        next()
    })

// Rotas
    app.use('/admin', admin)
// Outros
const port = 8081
app.listen(port, () => {
    console.log("Servidor online! http://localhost:8081")
})