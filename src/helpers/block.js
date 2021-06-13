const SHA256 = require('crypto-js/sha256');
const fs = require('fs')
//const readFile =  fs.readFileSync(`${config.api.file_path}`, "utf-8")


class Block {
    constructor(data) {
        this.index = 0;
        this.date = new Date();
        this.data = data;
        this.previousHash = "0";
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.date + this.data + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(!this.hash.startsWith(difficulty)) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

module.exports = Block;