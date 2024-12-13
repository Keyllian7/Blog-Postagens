const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")


router.get("/registro", (req, res) => {
    res.render("usuario/registro")
})

router.post("/registro", (req, res) => {
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: "Nome inválido"})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({texto: "Email inválido"})
    }

    if(!req.body.senha1 || typeof req.body.senha1 == undefined || req.body.senha1 == null) {
        erros.push({texto: "Senha inválida"})
    }

    if(req.body.senha1.length < 4 || req.body.senha2.length < 4) {
        erros.push({texto: "Senha muito curta"})
    }

    if(req.body.senha1 != req.body.senha2) {
        erros.push({texto: "As senhas são diferentes, tente novamente"})
    }

    if(erros.length > 0) {
        res.render("usuarios/registro", {erros: erros})
    }else{
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if(usuario){
                req.flash("mensagem_erro", "Já existe uma conta com este email")
                res.redirect("/usuarios/registro")
            }else{

                novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha1
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if(erro) {
                            req.flash("mensagem_erro", "Houve um erro durante o salvamento do usuário")
                            res.redirect("/")
                        }

                        novoUsuario.senha = hash

                        novoUsuario.save().then(() => {
                            req.flash("mensagem_sucesso", "Usuário criado com sucesso")
                            res.redirect("/")
                        }).catch((err) => {
                            req.flash("mensagem_erro", "Houve um erro ao criar o usuário")
                            res.redirect("/")
                        })

                    })
                })

            }
        }).catch((err) => {
            req.flash("mensagem_erro", "Houve um erro interno")
            res.redirect("/")
        })
    }

})

module.exports = router