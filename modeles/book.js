const {Schema, model} = require('mongoose')

const book = new Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: Number,
    page: Number,
    genreId: {
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    },
    img: String,
    lang: String,
    text: String,
    publisher: String,
    type: String,
    isbn: String,
})


module.exports = model('Book',book)