const { check } = require('express-validator');
const {validationResult} = require('../commons');


const _stringRequired = check('string', 'String required').not().isEmpty();

const postRequestValidations = [
    _stringRequired,
    validationResult
]
module.exports = {
    postRequestValidations
}