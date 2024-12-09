const mongoose = require('mongoose');

const ConnectDB = async()=>{

    try{

        const conn = await mongoose.connect(process.env.DB_URI,{
            useNewUrlParser:true
        });

        console.log(`MongoDBNowConnected:${conn.connection.host}`);

        
    }catch(error){

        console.error(`Error:${error.message}`)
        process.exit(1)


    }

}

module.exports=ConnectDB;