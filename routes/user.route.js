const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller')

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/:id/delete', controller.delete);

router.post('/create', controller.portCreate);

module.exports = router;