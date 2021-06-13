const dotenv = require('dotenv');

const envFound = dotenv.config();
if(!envFound){
    throw new Error("Couldn't find .env file.");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    port: process.env.PORT,
    api: {
        url: process.env.URL_API,
        prefix_versionApi: process.env.PREFIX_VERSION,
        file_path: process.env.FILE_PATH,
        path_dir: process.env.PATH_DIR
    },
    log: {
        level: process.env.LOG_LEVEL
    },
    swagger: {
        path: '/documentation'
    },
    block: {
        genesis: process.env.GENESIS
    }
}
