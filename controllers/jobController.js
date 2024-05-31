import { nanoid } from 'nanoid';
import Job from '../models/jobModel.js';
import {StatusCodes} from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

/*
* Considerations:
* In this project the libraries used are:
* - http-status-codes (res.status(200).json({ jobs }); -> res.status(StatusCodes.OK).json({ jobs });)
* - express-async-errors
* - 404 is handled in a custom class
* - The NOT FOUND in all the methods is handled by the custom class, in the validationMiddleware.js
* a layer on top of the controller. (This is to leave the controllers as clean as possible)
 */

/* Local Data
let jobs = [
    { id: nanoid(), company: 'apple', position: 'front-end' },
    { id: nanoid(), company: 'google', position: 'back-end' },
    { id: nanoid(), company: 'facebook', position: 'full-stack' },
    { id: nanoid(), company: 'amazon', position: 'devops' },
    { id: nanoid(), company: 'microsoft', position: 'data scientist' },
];
 */

/* Get all jobs (Local Data)
export const getAllJobs = async (req, res) => {
    res.status(200).json({ jobs });
}
 */

// Get all jobs (MongoDB)
export const getAllJobs = async (req, res) => {

    // When the user makes the request with the token we only provide jobs that belongs to the specific user
    const jobs = await Job.find({ createdBy: req.user.userId } );
    res.status(StatusCodes.OK).json({ jobs });
}

/* Create a new job (Local Data)
*export const createJob = async (req, res) => {
    const { company, position } = req.body;
    if (!company || !position) {
        return res.status(400).json({ msg: 'Please provide company and position'});
    }
    const id = nanoid(10);
    const job = { id, company, position };
    jobs.push(job);
    res.status(201).json({ job });
}
*/

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

/* Delete a job (Local Data)
export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const job = jobs.find(job => job.id === id);
    if (!job) {
        return res.status(404).json({ msg: `Job not found with id: ${id}`});
    }
    jobs = jobs.filter(job => job.id !== id);
    res.status(200).json({ msg: 'Job deleted' });
}
 */

// Delete a job (MongoDB)
export const deleteJob = async (req, res) => {

    const removedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ msg: 'Job deleted', job: removedJob });
}

/* Update a job (Local Data)
export const updateJob = async (req, res) => {
    const { company, position } = req.body;
    if (!company || !position) {
        return res.status(400).json({ msg: 'Please provide company and position'});
    }
    const { id } = req.params;
    const job = jobs.find(job => job.id === id);
    if (!job) {
        return res.status(404).json({ msg: `Job not found with id: ${id}`});
    }
    job.company = company;
    job.position = position;
    res.status(200).json({ msg: 'Job modified', job });
}
*/

// Update a job (MongoDB)
export const updateJob = async (req, res) => {

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(StatusCodes.OK).json({ msg: 'Job modified', job: updatedJob });
}

/* Get a single job (Local Data)
export const getSingleJob = async (req, res) => {
    const { id } = req.params;
    const job = jobs.find(job => job.id === id);
    if (!job) {
        return res.status(404).json({ msg: `Job not found with id: ${id}`});
    }
    res.status(200).json({ job });
}
 */

// Get a single job (MongoDB)
export const getSingleJob = async (req, res) => {

    const job = await Job.findById(req.params.id);
    res.status(StatusCodes.OK).json({job});
}


