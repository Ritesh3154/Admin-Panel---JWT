const router = require('express').Router()
const CategoryController = require('../controller/CategoryController')


router.post('/', CategoryController.Store)
router.get('/:id',CategoryController.trash)
router.post('/:id',CategoryController.update)

module.exports = router