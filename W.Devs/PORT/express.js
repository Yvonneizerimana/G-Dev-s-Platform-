 import express from 'express';
 const app = express();
 import configurations from '../configs/index.js'
 import router from '../routes/index.js'
//  import errorHandler from '../errors/errorhandler.js'

export default function PORT(app){
    app.listen(configurations.PORT,()=>{
        console.log(`server is started on port ${configurations.PORT}`);
    })
    app.use('/api', router);

return app;

}