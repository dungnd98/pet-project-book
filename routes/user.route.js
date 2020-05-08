const express = require('express')
const router = express.Router()
const multer  = require('multer')

const upload = multer({ dest: 'uploads/' })

const controller = require('../controllers/user.controller')
const validation = require('../validations/user.validation')

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/profile', controller.profile);

router.get('/profile/avatar', controller.updateAvatar);

router.get('/:id/delete', controller.delete);

router.post('/create', validation.postCreate, controller.portCreate);

router.post('/profile/avatar',
      upload.single('avatar'),
      controller.portAvatar);

module.exports = router;