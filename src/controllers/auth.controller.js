import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

/**
 * @name registerUserController
 * @description registers a new user, expects username, email and password in the request body
 * @access Public
 */
const registerUserController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "all fields are requierd" });
        }

        const user = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hash
        });

        const token = jwt.sign(
            {
                id: newUser._id,
                user: newUser.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        res.status(400).json({ message: "Error registering user", error });
    }
};


/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                user: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token);

        res.status(201).json({
            message: "User loggedIn successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(400).json({ message: "Error logging in", error });
    }
};

export default {
    registerUserController,
    loginUserController,
}