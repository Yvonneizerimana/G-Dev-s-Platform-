import mongoose from 'mongoose';
import configurations from '../configs/index.js';

export default function(){
    mongoose.connect(configurations.CONNECTION)
    .then(()=>{
        console.log('databse connected successfully');
    })
    .catch((error)=>{
        console.log("failed to connect to database")
        console.log(error.message);
    })
}
