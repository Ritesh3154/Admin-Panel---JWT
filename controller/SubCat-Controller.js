const SubCat = require("../model/SubCat-model")

exports.store = async (req, res) => {
    try {
        const { category, sub_cat } = req.body

        const subcat = await SubCat.create({ category, sub_cat })
        res.redirect("/viewsubcat")
    } catch (error) {
        console.log(error)
    }

}

exports.index = async (req, res) => {
    const subcat = await SubCat.find()
    res.json({
        subcat,
    })
}

exports.trash = async (req, res) => {
    const { id } = req.params
    await SubCat.findByIdAndDelete(id)
    res.redirect('/viewsubcat')
}

exports.edit = async (req, res) => {
    try {
        const { category, sub_cat } = req.body
        const { id } = req.params
        await SubCat.findByIdAndUpdate(
            {
                _id: id
            }, {
            category, sub_cat
        }
        )
        res.redirect('/viewsubcat')
    } catch (error) {
        console.log(error)
    }
}