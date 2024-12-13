const { default: mongoose } = require('mongoose');
const moogoose = require('mongoose');
const Schema = moogoose.Schema;

const Usuario = new Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    },
    permissao: {
        type: Number,
        default: 0
    }
})

mongoose.model("usuarios", Usuario)