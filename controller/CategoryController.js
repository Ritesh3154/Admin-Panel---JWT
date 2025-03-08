const Category = require('../model/CategoryModel')

exports.Store = async (req, res) => {
   // console.log("store API");

   try {
      const { cat_name } = req.body;

      const existData = await Category.findOne({ cat_name }).countDocuments()
      // console.log(existData);

      if (existData > 0) {
         res.json({
            success: true,
            message: "category already exists❌❌"
         })
      } else {
         const category = await Category.create({ cat_name })
         res.redirect('/ViewCategory')
      }
   } catch (error) {
      console.log(error);
   }
}


exports.trash = async (req, res) => {
   try {
      const { id } = req.params
      await Category.findByIdAndDelete(id)
      res.json("deleted!1")
   } catch (error) {
      console.log(error);
   }
}

exports.update = async (req, res) => {
   try {
      const { id } = req.params
      await Category.findByIdAndUpdate(
         {
            _id: id
         },
         {
            cat_name: req.body.cat_name
         }
      )
      res.json({
         success: true,
         message: "category updated"
      })
   } catch (error) {
      console.log(error);
   }
}