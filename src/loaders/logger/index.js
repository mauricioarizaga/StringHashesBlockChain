const winston = require('winston');
const config = require('../../config');

const LoggerInstance = winston.createLogger({
    level: config.log.level,
    format: winston.format.json(),
    defaultMeta: { Server: 'Api AtixsLabs!' },
    transports: [
      
        new winston.transports.File({ filename: 'src/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/logs/combined.log' })
    ]
});


if (process.env.NODE_ENV !== 'production') {
    LoggerInstance.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}


module.exports = LoggerInstance;