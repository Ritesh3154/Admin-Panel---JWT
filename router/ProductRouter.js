const router = require('express').Router()
const ProductController = require('../controller/ProductController')
const upload = require('../middleware/uploadFile')

router.post('/',upload.single('p_image'), ProductController.store)
router.get('/:id',ProductController.trash)
router.post('/:id',ProductController.edit)

module.exports = router