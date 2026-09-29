import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "token is required"]
        }
    },
    {
        timestamps: true
    }
);

const TokenBlacklist = mongoose.model("blacklistToken", blacklistTokenSchema);

export default TokenBlacklist;