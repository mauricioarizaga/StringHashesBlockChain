const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const config = require('../../config');
const logger = require('../logger');
const cors = require('cors')
class ExpressServer {

    constructor() {

        this.app = express();
        this.app.use(cors())
        this.port = config.port;
        this.basePathString = `${config.api.prefix_versionApi}/string`;
      
        this._middlewares();
        
        this._swaggerConfig();

        this._routes();

        this._notFound();
        this._errorHandler();
        
        

    }

    _middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); // Rellenar con la url donde se enviarán las requests
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
        });
        }

    _routes() {

        this.app.get("/gitflow", (req, res) => {
            res.status(200).json({prueba: 'Test Ok'});
        });

        this.app.use(this.basePathString, require('../../routes/string.js'));
    }

    _notFound() {
        this.app.use((req, res, next) => {
            const err = new Error("Not Found");
            err.code = 404;
            next(err);
        });
    }

    _errorHandler() {
        this.app.use((err, req, res, next) => {
            const code = err.code || 500;

            logger.error(`${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            logger.error(err.stack);

            const body = {
                error: {
                    code,
                    message: err.message,
                    detail: err.data
                }
            }
            res.status(code).json(body);
        });
    }

    _swaggerConfig(){
        this.app.use(
            config.swagger.path, 
            swaggerUi.serve, 
            swaggerUi.setup(require('../swagger/swagger.json'))
        );
    }

    async start() {
      
        this.app.listen(this.port, (error) => {
            if(error) {
                logger.error(err);
                process.exit(1);
                return;
            }
        });
    }

}



module.exports = ExpressServer;