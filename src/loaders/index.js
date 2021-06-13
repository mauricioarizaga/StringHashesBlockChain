const ExpressServer = require('./server/expressServer');
const config = require('../config');
const logger = require('./logger');
const fs = require('fs')                               

module.exports = () => {
 
    const server = new ExpressServer();
    logger.info('Express Loaded - API Reloaded ');

    server.start();

    if(fs.existsSync(`${config.api.file_path}`)){

      logger.info("El archivo ya existe en el servidor");
      
    } else {
      
      fs.mkdir(`${config.api.path_dir}`,(err) => {
        
        if (err) throw err;
        
        logger.info("El directorio ha sido creado!");
      })
     
      fs.writeFile(`${config.api.file_path}`, '', (err) => {
         
          if (err) throw err;

          logger.info("El archivo ha sido creado!");  
       
        });
      }
  
    logger.info(`#######################################
      El Server listening on port: ${config.port}
      #######################################
    `);
  }
