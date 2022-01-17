const router = require('express').Router()

const colorCtrl = require('../controller/colorCtrl')

router.route('/color')
    .get(colorCtrl.getColors)

module.exports = router