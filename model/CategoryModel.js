const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    cat_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
})

const category = model('Category', CategorySchema)
module.exports = category
