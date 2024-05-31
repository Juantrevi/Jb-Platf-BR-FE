import {StatusCodes} from "http-status-codes";
import  User  from "../models/userModel.js";
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    // If the amount of users is 0, the first user will be an admin
    const isFirstAccount = await User.countDocuments() === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // Create a new user
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'User created' });

    res.send('register');
};

export const login = async (req, res) => {
    res.send('login');
};