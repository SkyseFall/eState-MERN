
// logic here.

import User from "../models/user.model.js";
import { errorhandle } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
    // res.json({ message: "How are u ?" });
    res.send("Hello, Pintu");
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorhandle(401, "You can only update your own account !"))

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const upadteUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true })  // add new: true will get the new response, otherwise get old data.

        const { password, ...restInfo } = upadteUser._doc;
        res.status(200).json(restInfo);
    } catch (error) {
        next(error);
    }
};

// 2nd step to create delete logic. then go to... profile UI page.
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorhandle(401, "Invalid user"));

    try {

        await User.findByIdAndDelete(req.params.id);
        res.clearcookie('access_token');
        res.status(200).json("user has been deleted Successfully!");
    } catch (error) {
        next(error);
    }
}