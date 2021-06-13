
const fs = require('fs');
const config = require('../config/index')
const Block = require('../helpers/block');
const BlockChain = require('../helpers/blockchain');
const blockChain = new BlockChain('00');


const save = async (str) => {
  
    const stringToSaveFile = await blockChain.addBlock(new Block({string: str}));
  
     fs.appendFile(`${config.api.file_path}`, `${stringToSaveFile}\n`, function (err) {
        if (err) return console.log(err);
    });   
    return stringToSaveFile
} 

module.exports = {
    save
}