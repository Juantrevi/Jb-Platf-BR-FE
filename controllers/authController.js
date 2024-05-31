import {StatusCodes} from "http-status-codes";
import  User  from "../models/userModel.js";
import { hashPassword } from "../utils/passwordUtils.js";


export const register = async (req, res) => {
    // If the amount of users is 0, the first user will be an admin
    const isFirstAccount = await User.countDocuments() === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';

    // Hash the password wit passwordUtils.js
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    // Create a new user
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'User created' });
};

export const login = async (req, res) => {
    res.send('login');
};