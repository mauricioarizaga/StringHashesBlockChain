const Block = require('./block');
const config = require('../config/index')
const readLastLine = require('./readLine')
const logger = require('../loaders/logger/index');

class Blockchain {
    constructor(difficulty = '00') {
        this.chain = [this.createGenesis()];
        this.difficulty = difficulty;
    }

   createGenesis() {
        return new Block(0, {string: config.block.genesis});
    }

async latestBlock() {
    const readerLast = await readLastLine()
    try{
    if(readerLast){
  
    const splitLine = readerLast.split(',');
    const newLastestBlock = this.chain[this.chain.length - 1]
    newLastestBlock.previousHash = splitLine[0]
     return newLastestBlock 

    }else{

        return this.chain[this.chain.length - 1];
    
    }

    }catch(error){
    console.log(error)
}
 }

async addBlock(newBlock) {
    const lastBlockReading = await this.latestBlock()
   
    try{
        newBlock.index = lastBlockReading.index + 1;
        newBlock.previousHash = lastBlockReading.hash;
        newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        let block = newBlock.hash +','+ newBlock.data.string + ','+ newBlock.nonce;
        return block
        }
    catch(error){
        console.log(error)
    }
}
}

module.exports = Blockchain;