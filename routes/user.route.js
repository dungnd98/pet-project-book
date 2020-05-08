const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller')
const validation = require('../validations/user.validation')

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/:id/delete', controller.delete);

router.post('/create', validation.postCreate, controller.portCreate);

module.exports = router;