const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.render("admin/posts")
})

router.get('/categorias', (req, res) => {
    res.render("admin/categorias")
})

router.get('/categorias/adicionar', (req, res) => {
    res.render("admin/adicionar-categorias")
})

module.exports = router