// Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path');
// const mongoose = require('mongoose')

// Configurações

    // Body parse
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    // Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main',
        runtimeOptions: {allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true}}));
    app.set('view engine', 'handlebars');

    // Mongoose

        // Em breve

    // Public
    app.use(express.static(path.join(__dirname, "public")))

    // Outras configurações

// Rotas
    app.use('/admin', admin)
// Outros
const port = 8081
app.listen(port, () => {
    console.log("Servidor online! http://localhost:8081")
})