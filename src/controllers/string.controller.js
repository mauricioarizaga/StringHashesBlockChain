const express = require('express');
const stringService = require('../services/stringService');
const Success = require('../handlers/successHandler');


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const createString = async (req, res, next) => {
    let {string} = req.body
   
    try {
       
       string = await stringService.save(string);

        res.status(200).json(new Success(string));
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createString
}