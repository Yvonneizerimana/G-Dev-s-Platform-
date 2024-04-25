// import express from 'express';
// const app = express();
 import configurations from '../configs/index.js'

export default function PORT(app){
  
    app.listen(configurations.PORT,()=>{
        console.log(`server is started on port ${configurations.PORT}`);
    })

}