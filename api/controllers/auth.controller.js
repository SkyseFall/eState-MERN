import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorhandle } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashPassword });

    try {
        await newUser.save()
        res.status(201).json('user created successfully');
    } catch (error) {
        next(error); // readmade error handler.
        // next(errorhandle(550, "Error from This function")); // custom error handler.
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorhandle(404, "User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorhandle(401, "Wrong Credential"));

        // destructure for password
        const { password: pass, ...restInfo
        } = validUser._doc;

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(restInfo);
    } catch (error) {
        next(error);
    }
}