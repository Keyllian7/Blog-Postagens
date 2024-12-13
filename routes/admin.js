const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Postagem')
const Postagem = mongoose.model('postagens')
const {permissao} = require("../helpers/permissoes")

router.get('/', permissao, (req, res) => {
    res.render("admin/index")
})

router.get('/posts', permissao, (req, res) => {
    res.render("admin/posts")
})

router.get('/categorias', permissao, (req, res) => {
    Categoria.find().sort({date:"desc"}).then((categorias) => {
    res.render("admin/categorias", {categorias: categorias})
    }).catch((err) => {
        req.flash("mensagem_erro", "Erro ao listar categorias!")
        res.redirect("/admin")
    });
})

router.get('/categorias/adicionar', permissao, (req, res) => {
    res.render("admin/adicionar-categorias")
})

router.post('/categorias/nova', permissao, (req, res) => {

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

    if(req.body.slug.length < 2){
        erros.push({texto: "Slug da categoria muito pequeno!"})
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

router.get('/categorias/editar/:id', permissao, (req, res) => {
    Categoria.findOne({ _id: req.params.id }).then((categoria) => {
        res.render("admin/editar-categorias", { categoria: categoria })
    }).catch((err) => {
        req.flash("mensagem_erro", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })
})

router.post('/categorias/editar', permissao, (req, res) => {

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

router.post('/categorias/deletar', permissao, (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash("mensagem_sucesso", "Categoria deletada com sucesso")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("mensagem_erro", "Erro ao deletar categoria")
        res.redirect("/admin/categorias")
    })
})

router.get('/postagens', permissao, (req, res) => {
   Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens) => {
    res.render("admin/postagens", {postagens: postagens})
   }).catch((err) => {
    req.flash("mensagem_erro", "Erro ao listar postagens")
    res.redirect("/admin")
   })
})

router.get('/postagens/adicionar', permissao, (req, res) => {
    Categoria.find().then((categorias) => {
        res.render("admin/adicionar-postagens", {categorias: categorias})
    }).catch((err) => {
        req.flash("mensagem_erro", "Erro ao carregar formulário")
        res.redirect("/admin")
    })
})

router.post('/postagens/nova', permissao, (req, res) => {
    var erros = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null || req.body.titulo.length < 2){ 
        erros.push({texto: "Título inválido ou muito curto!"}) 
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null || req.body.slug.length < 2){ 
        erros.push({texto: "Slug inválido ou muito curto!"}) 
    }

    if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null || req.body.descricao.length < 2){ 
        erros.push({texto: "Descrição inválida ou muito curto!"}) 
    }

    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null || req.body.conteudo.length < 2){ 
        erros.push({texto: "Conteúdo inválido ou muito curto!"}) 
    }

    if(req.body.categoria == "0"){
        erros.push({texto: "Categoria inválida, registre uma categoria"})
    }

    if(erros.length > 0){
        res.render("admin/adicionar-postagens", {erros: erros})
    } else {
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash("mensagem_sucesso", "Postagem criada com sucesso")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("mensagem_erro", 'Erro ao criar postagem')
            res.redirect("/admin/postagens")
        })
    }
})

router.get('/postagens/editar/:id', permissao, (req, res) => {

    Postagem.findOne({ _id: req.params.id }).then((postagem) => {
        Categoria.find().then((categorias) => {
            res.render("admin/editar-postagens", { categorias: categorias, postagem: postagem })
        }).catch((err) => {
            req.flash("mensagem_erro", "Erro ao listar categorias")
            res.redirect("/admin/postagens")
        })
    }).catch((err) => {
        req.flash("mensagem_erro", "Esta postagem não existe")
        res.redirect("/admin/postagens")
    })

})

router.post('/postagens/editar', permissao, (req, res) => {

    Postagem.findOne({_id: req.body.id}).then((postagem) => {

        Postagem.titulo = req.body.titulo,
            postagem.descricao = req.body.descricao,
            postagem.conteudo = req.body.conteudo,
            postagem.categoria = req.body.categoria,

            postagem.save().then(() => {
                req.flash("mensagem_sucesso", "Postagem editada com sucesso")
                res.redirect("/admin/postagens")
            }).catch((err) => {
                req.flash("mensagem_erro", "Erro ao salvar edição da postagem")
                res.redirect("/admin/postagens")

            }).catch((err) => {
                req.flash("mensagem_erro", "Erro ao editar postagem")
                res.redirect("/admin/postagens")
            })
    })
})

router.get('/postagens/deletar/:id', permissao, (req, res) => {
    Postagem.deleteOne({_id: req.params.id}).then(() => {
        req.flash("mensagem_sucesso", "Postagem deletada com sucesso")
        res.redirect("/admin/postagens")
    }).catch((err) => {
        req.flash("mensagem_erro", "Erro ao deletar postagem")
        res.redirect("/admin/postagens")
    })
})

module.exports = router