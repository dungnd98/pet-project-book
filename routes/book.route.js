const express = require('express')
const router = express.Router()
const multer  = require('multer')

const upload = multer({ dest: 'uploads/' })

const controller = require('../controllers/book.controller')

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/:id/delete', controller.delete);

router.post('/create', upload.single('avatar'), controller.postCreate);

module.exports = router;
