const router = require('express-promise-router')()
const HomeController = require('./../controllers/HomeController')
router.route('/')
    .get(HomeController.index)
module.exports = router