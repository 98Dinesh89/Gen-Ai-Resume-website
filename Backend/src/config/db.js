import mongoose from "mongoose";
import "dotenv/config";

const connectToBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error connecting to Database : ", error);
    }
};

export default connectToBD;