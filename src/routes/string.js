const { Router } = require('express');
const {  createString } = require('../controllers/string.controller');
const { postRequestValidations } = require('../middlewares/str');

const router = Router();

router.post('/', postRequestValidations, createString);

module.exports = router;