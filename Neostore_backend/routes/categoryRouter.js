const router = require('express').Router()

const categoryCtrl = require('../controller/categoryCtrl')
//const auth = require('../middleware/auth')
//const authAdmin = require('../middleware/authAdmin')

router.route('/category')
    .get(categoryCtrl.getCategories)
  /*   .post(auth, categoryCtrl.createCategory) */

/* router.route('/category/:id')
    .delete(auth, categoryCtrl.deleteCategory)
    .put(auth, categoryCtrl.updateCategory) */


module.exports = router