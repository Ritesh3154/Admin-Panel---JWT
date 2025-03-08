const Product = require("../model/ProductModel")

exports.store = async (req, res) => {
    try {
        const { category, subCategory, p_name, p_price } = req.body
        await Product.create({ category, subCategory, p_name, p_price, p_image: req.file.filename })
        res.redirect('/viewProduct')
    } catch (error) {
        console.log(error)
    }
}

exports.trash = async (req, res) => {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    res.redirect('/viewProduct')
}

exports.edit = async (req, res) => {
    const { id } = req.params
    const { category, subCategory, p_name, p_price } = req.body
    await Product.findByIdAndUpdate(
        {
            _id: id
        },
        {
            category, subCategory, p_name, p_price, p_image: req?.file?.filename
        }
    )
    res.redirect('/viewProduct')
}