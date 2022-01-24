const router = require('express').Router()

const categoryCtrl = require('../controller/categoryCtrl')

router.route('/category')
    .get(categoryCtrl.getCategories)

module.exports = router