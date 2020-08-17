const mongoose = require('mongoose')

const connectDB = async ()=>{

    mongoose.set('strictQuery',false)
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true, 
            useUnifiedTopology: true
        })
        
        console.log(`mongoDB compass connected:${conn.connection.host}`);
    }catch(err){
        console.error(err)
        process.exit(1)
    }
}


module.exports = connectDB