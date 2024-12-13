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
require('./models/Postagem')
const Postagem = mongoose.model('postagens')
require('./models/Categoria')
const Categoria = mongoose.model('categorias')
const usuarios = require('./routes/usuario')
const passport = require('passport');
require('./config/auth')(passport)

// Configurações

    // Dotenv
    require('dotenv').config();

    // Sessão
    app.use(session({
        secret: process.env.SECRET_PASSWORD,
        resave: true,
        saveUninitialized: true
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use(flash())

    // Middleware
    app.use((req, res, next) => {
        res.locals.mensagem_sucesso = req.flash("mensagem_sucesso")
        res.locals.mensagem_erro = req.flash("mensagem_erro")
        res.locals.error = req.flash("error")
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

    app.get('/', (req, res) => {
        Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens) => {
            res.render("index", {postagens: postagens})
        }).catch((err) => {
            req.flash("mensagem_erro", "Houve um erro ao listar as postagens")
            res.redirect("/404")
        })
    })

    app.get('/404', (req, res) => {
        res.send("Erro 404!")
    })

    app.get('/posts', (req, res) => {
        res.send("Lista de postagens")
    })

    app.get('/postagem/:slug', (req, res) => {
        Postagem.findOne({slug: req.params.slug}).then((postagem) => {
            if(postagem){
                res.render("post/index", {postagem: postagem})
            }else{
                req.flash("mensagem_erro", "Esta postagem não existe")
                res.redirect("/")
            }
        }).catch((err) => {
            req.flash(mensagem_erro, "Houve um erro interno")
            res.redirect("/")
        })
    })

    app.get("/categorias", (req, res) => {
        Categoria.find().then((categorias) => {
            res.render("categorias/index", {categorias: categorias})
        }).catch((err) => {
            req.flash("mensagem_erro", "Houve um erro ao listar as categorias")
            res.redirect("/")
        })
    })

    app.get('/categorias/:slug', (req, res) => {
        Categoria.findOne({slug: req.params.slug}).then((categoria) => {
            if(categoria){
                Postagem.find({categoria: categoria._id}).then((postagens) => {
                    res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
                }).catch((err) => {
                    req.flash("mensagem_erro", "Houve um erro ao listar as postagens")
                    res.redirect("/")
                })
            }else{
                req.flash("mensagem_erro", "Esta categoria não existe")
                res.redirect("/")
            }
        }).catch((err) => {
            req.flash("mensagem_erro", "Houve um erro interno ao carregar a página")
            res.redirect("/")
        })
    })


    app.use('/admin', admin)
    app.use('/usuarios', usuarios)
    
// Outros
const port = 8081
app.listen(port, () => {
    console.log("Servidor online! http://localhost:8081")
})