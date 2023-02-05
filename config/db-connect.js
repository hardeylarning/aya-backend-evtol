import mongoose from "mongoose";


export const dBConnection = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_URL );
        console.log("Database connected sucessfully!");
    } 
    catch (error) {
        console.log("Error: "+error.message);
        process.exit(1);
    }
}

