const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.render("admin/posts")
})

router.get('/categorias', (req, res) => {
    Categoria.find().sort({date:"desc"}).then((categorias) => {
    res.render("admin/categorias", {categorias: categorias})
    }).catch((err) => {
        req.flash("mensagem_erro", "Erro ao listar categorias!")
        res.redirect("/admin")
    });
})

router.get('/categorias/adicionar', (req, res) => {
    res.render("admin/adicionar-categorias")
})

router.post('/categorias/nova', (req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido!"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido!"})
    }

    if(req.body.nome.length < 2){
        erros.push({texto: "Nome da categoria muito pequeno!"})
    }

    if(erros.length > 0){
        res.render("admin/adicionar-categorias", {erros: erros})
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(() => {
            req.flash("mensagem_sucesso", "Categoria criada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("mensagem_erro", "Erro ao salvar categoria, tente novamente")
            res.redirect("/admin")
        })
    }
})

router.get('/categorias/editar/:id', (req, res) => {
    Categoria.findOne({ _id: req.params.id }).then((categoria) => {
        res.render("admin/editar-categorias", { categoria: categoria })
    }).catch((err) => {
        req.flash("mensagem_erro", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })
})

router.post('/categorias/editar', (req, res) => {

    Categoria.findOne({ _id: req.body.id }).then((categoria) => {
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() => {
            req.flash("mensagem_sucesso", "Categoria editada com sucesso")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("mensagem_erro", "Erro ao salvar edição da categoria")
            res.redirect("/admin/categorias")
        })

    }).catch((err) => {
        req.flash("mensagem_erro", "Erro ao editar categoria")
        res.redirect("/admin/categorias")
    })
})

router.post('/categorias/deletar', (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash("mensagem_sucesso", "Categoria deletada com sucesso")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("mensagem_erro", "Erro ao deletar categoria")
        res.redirect("/admin/categorias")
    })
})

module.exports = router