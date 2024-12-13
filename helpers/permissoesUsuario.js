module.exports = {
    permissaoUsuario: function (req, res, next) {

        if (req.isAuthenticated() && (req.user.permissao == 0 || req.user.permissao == 1)) {
            return next()
        }

        req.flash("mensagem_erro", "Você precisa está logado para acessar esta página")
        res.redirect("/")

    }
}