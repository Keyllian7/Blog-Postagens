const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const Postagem = new Schema({
    titulo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categorias',
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('postagens', Postagem)