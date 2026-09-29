import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: [true, "username already taken"],
            required: true
        },

        email: {
            type: String,
            unique: [true, "Account already exists"],
            required: true
        },

        password: {
            type: String,
            required: true
        }
    }
);

const User = mongoose.model("user", userSchema);

export default User;