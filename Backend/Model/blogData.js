const mongoose = require('mongoose')
const blogDataSchema = new mongoose.Schema({
    title:String,
    description:String,
    image:String,
    moreinfo:String
})
module.exports = mongoose.model('blogs',blogDataSchema)