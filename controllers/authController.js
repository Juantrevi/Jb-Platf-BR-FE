import {StatusCodes} from "http-status-codes";
import  User  from "../models/userModel.js";
import {comparePassword, hashPassword} from "../utils/passwordUtils.js";
import {UnauthenticatedError} from "../errors/customErrors.js";
import {createJWT} from "../utils/tokenUtils.js";


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

    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    //Check if the user exists and if the password is correct
    const isValidUser = user && await comparePassword(req.body.password, user.password);

    // throw an error if the user is not valid or password is incorrect
    if (!isValidUser) throw new UnauthenticatedError('Invalid credentials');

    // Create a token
    const token = createJWT({ userId: user._id, role: user.role });

    // Set the cookie expiration date
    const oneDay = 1000 *60 * 60 * 24;

    // Send the token in a cookie
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production' });

    res.status(StatusCodes.OK).json({ msg: 'User logged in' });

};

export const logout = async (req, res) => {

    // Clear the cookie
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: 'User logged out' });
};