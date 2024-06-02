import StatusCodes from 'http-status-codes';
import User from '../models/userModel.js';
import Job from "../models/jobModel.js";

export const getCurrentUser = async (req, res) => {
    // Find the user by the userId
    const user = await User.findOne({_id: req.user.userId});

    //Remove password from the user object (Check userModel.js)
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ userWithoutPassword });

}

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({ users, jobs });

}

export const updateUser = async (req, res) => {

    const obj = { ...req.body };
    delete obj.password;
    console.log(obj);

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
    res.status(StatusCodes.OK).json({msg: 'updated user'});

}