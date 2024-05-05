 import express from 'express';
 import configurations from '../configs/index.js'
 import router from '../routes/index.js'
 import documentation from '../docs/documentation.js';
 import swaggerUi from 'swagger-ui-express'
//  import errorHandler from '../errors/errorhandler.js'

export default function PORT(app){
    app.listen(configurations.PORT,()=>{
        console.log(`server is started on port ${configurations.PORT}`);
    })
    app.use('/api-doc', swaggerUi.serve);
    app.use('/api-doc', swaggerUi.setup(documentation));
    app.use('/api/v1', router);

return app;

}