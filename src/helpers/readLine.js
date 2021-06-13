const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');
const config = require('../config/index')

const readLastLine = () =>{
    const minLengthFile = 1
    let lastLineFile = '';
    let input = fs.createReadStream(`${config.api.file_path}`);
    let output = new Stream;
    return new Promise((res, rej)=> {
        let reader = readline.createInterface(input, output);
        reader.on('line', (line) => {
            if (line.length >= minLengthFile) {
                lastLineFile = line;
            }
        });
        reader.on('error', rej)
        reader.on('close', () => {
            res(lastLineFile)
        });
    })

}

module.exports = readLastLine