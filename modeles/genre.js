const {Schema, model} = require('mongoose')
const genre = new Schema({
    name: { type: String, required: true },
})
module.exports = model('Genre',genre)