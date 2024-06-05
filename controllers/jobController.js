import { nanoid } from 'nanoid';
import Job from '../models/jobModel.js';
import {StatusCodes} from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import day from "dayjs";

/*
* Considerations:
* In this project the libraries used are:
* - http-status-codes (res.status(200).json({ jobs }); -> res.status(StatusCodes.OK).json({ jobs });)
* - express-async-errors
* - 404 is handled in a custom class
* - The NOT FOUND in all the methods is handled by the custom class, in the validationMiddleware.js
* a layer on top of the controller. (This is to leave the controllers as clean as possible)
 */

// Get all jobs (MongoDB)
export const getAllJobs = async (req, res) => {

    // When the user makes the request with the token we only provide jobs that belongs to the specific user
    const jobs = await Job.find({ createdBy: req.user.userId } );
    res.status(StatusCodes.OK).json({ jobs });
}

// Create a new job (MongoDB)
export const createJob = async (req, res) => {
    /*
    * Try and Catch
    * We can use it to catch errors in our code
    * in each controller function or we can
    * install a package called express-async-errors

    try {
        const {company, position} = req.body;
        const job = await Job.create({company, position});
        res.status(201).json({job});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message});
    }
   */

    /*
    * Using express-async-errors
    * We can remove the try and catch block
    * */
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job});

}

// Delete a job (MongoDB)
export const deleteJob = async (req, res) => {

    const removedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ msg: 'Job deleted', job: removedJob });
}

// Update a job (MongoDB)
export const updateJob = async (req, res) => {

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(StatusCodes.OK).json({ msg: 'Job modified', job: updatedJob });
}

// Get a single job (MongoDB)
export const getSingleJob = async (req, res) => {

    const job = await Job.findById(req.params.id);
    res.status(StatusCodes.OK).json({job});
}

// Show stats (MongoDB)
export const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ]);
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 8 },
    ]);
    monthlyApplications = monthlyApplications
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;

            const date = day()
                .month(month - 1)
                .year(year)
                .format('MMM YY');
            return { date, count };
        })
        .reverse();

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });

};


