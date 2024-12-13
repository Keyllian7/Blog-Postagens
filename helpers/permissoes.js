module.exports = {
    permissao: function (req, res, next) {

        if (req.isAuthenticated() && req.user.permissao == 1) {
            return next()
        }

        req.flash("mensagem_erro", "Você precisa ser um administrador para acessar esta página")
        res.redirect("/")

    }
}