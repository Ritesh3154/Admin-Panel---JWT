const { Schema, model } = require("mongoose");

const subCatSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    sub_cat: {
        type: String
    }
})

const SubCat = model('subcat', subCatSchema)
module.exports = SubCat
