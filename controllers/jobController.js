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
    const {search, jobStatus, jobType, sort} = req.query;

    const queryObject = {
        createdBy: req.user.userId
    };

    if (search) {
        queryObject.$or = [
            {position:{ $regex: search, $options: 'i' }},
            {company:{ $regex: search, $options: 'i' }},
        ]
    }

    if (jobStatus && jobStatus !== 'all') {
        queryObject.jobStatus = jobStatus;
    }

    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType;
    }

    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'position',
        'z-a': '-position',
    }

    const sortKey = sortOptions[sort] || sortOptions.newest;

    // Setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // When the user makes the request with the token we only provide jobs that belongs to the specific user
    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    res.status(StatusCodes.OK).json({ totalJobs, numOfPages, currentPage:page, jobs });
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


