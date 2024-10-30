import mongoose from 'mongoose'

const connectDB = async() => {
    if(mongoose.connections[0].readyState){
        return true;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        console.log("MongoDB Connected")
        return true;
    }
    catch(err){
        console.log(err)
    }
}
 

export default connectDB;