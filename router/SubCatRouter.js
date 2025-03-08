const router = require('express').Router()
const subcatController = require('../controller/SubCat-Controller')

router.post('/', subcatController.store)
router.get('/', subcatController.index)
router.get('/:id', subcatController.trash)
router.post('/:id', subcatController.edit)

module.exports = router