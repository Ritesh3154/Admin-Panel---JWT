const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: "subcat"   
    },
    p_name: {
        type: String,
    },
    p_price: {
        type: Number
    },
    p_image: {
        type: String
    }
})

const Product = model('Product', productSchema)
module.exports = Product