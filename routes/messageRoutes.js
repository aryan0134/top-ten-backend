const express = require('express')

const router = express.Router()

const { messagePost } = require('../controllers/messageControllers')

//message POST request
router.post('/', messagePost)

module.exports = router