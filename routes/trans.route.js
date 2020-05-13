const express = require('express');
const router = express.Router();

const controller = require('../controllers/trans.controller');

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/:id/complete', controller.complete);

router.post('/create', controller.postCreate)

module.exports = router;




