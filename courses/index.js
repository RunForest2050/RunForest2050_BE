const express = require('express')
const router = express.Router()

//controller
const courseController = require('./controllers/course.controller')

//middleware
const multer = require('../middlewares/multers/multer')
const authmiddleware = require('../middlewares/user')

//validator
const validation = require('./validators/post.validator')

router.post(
    '/',
    authmiddleware.checkTokens,
    multer.upload.array('courseImage', 3),
    validation.postValidation,
    courseController.createPost
)

router.get('/:category', authmiddleware.checkUsers, courseController.getPost)

module.exports = router
