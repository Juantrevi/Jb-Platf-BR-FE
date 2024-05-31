import {body, validationResult} from "express-validator";
import {BadRequestError, NotFoundError, UnauthorizedError} from "../errors/customErrors.js";
import {JOB_STATUS, JOB_TYPE} from "../utils/constants.js";
import mongoose from 'mongoose';
import { param } from 'express-validator';
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";


const withValidationErrors = (validateValues) => {
    return [validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            // Check if there are any errors
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);

                // Check if the error is a job not found error
                if(errorMessages[0].startsWith('Job not')){
                    throw new NotFoundError(errorMessages);
                }
                // Check if the error is because the user is not authorized
                if(errorMessages[0].startsWith('You are not authorized')){
                    throw new UnauthorizedError('You are not authorized to do this action');
                }

                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
};

// export const validateTest = withValidationErrors(
//     body('name')
//     .notEmpty()
//     .withMessage('name is required')
//         .isLength({ min: 3, max: 50 })
//         .withMessage('name must be at least 3 characters long and at most 50 characters long')
//         .trim());

// Validating job input
export const validateJobInput = withValidationErrors([
    body('company')
        .notEmpty()
        .withMessage('company is required'),
    body('position')
        .notEmpty()
        .withMessage('position is required'),
    body('jobLocation')
        .notEmpty()
        .withMessage('job location is required'),
    body('jobStatus')
        .isIn(Object.values(JOB_STATUS))
        .withMessage('invalid status value'),
    body('jobType')
        .isIn(Object.values(JOB_TYPE))
        .withMessage('invalid job type'),
]);

// Validating id parameter for MongoDB (Because MongoDB uses ObjectIds, which are not the same as regular strings)
// The BadRequestError and NotFoundError could be replaced by a regular js Error, because the true error will be
// thrown in the withValidationErrors function
export const validateIdParam = withValidationErrors([
    param('id')
        .custom(async (value, { req }) => {
            // Check if the id is a valid MongoDB id
            const isValidId = mongoose.Types.ObjectId.isValid(value);
            if (!isValidId) throw new BadRequestError('invalid MongoDB id');

            // Check if the job exists
            const job = await Job.findById(value);
            if (!job) throw new NotFoundError(`Job not found with id: ${value}`);

            // Check if the user is an admin or the owner of the job so they can update or delete it
            const isAdmin = req.user.role === 'admin';
            const isOwner = job.createdBy.toString() === req.user.userId;
            if (!isAdmin && !isOwner) throw new UnauthorizedError('You are not authorized to do this action');

        })
]);

//Validation for user registration
export const validateRegisterInput = withValidationErrors([
    body('name')
        .notEmpty()
        .withMessage('name is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new BadRequestError('email already exists');
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long'),
    body('location')
        .notEmpty()
        .withMessage('location is required'),
    body('lastName')
        .notEmpty()
        .withMessage('last name is required'),
]);

//Validation for user login
export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
    body('name')
        .notEmpty()
        .withMessage('name is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (email, { req }) => {
            const user = await User.findOne({ email });
            // Check if the email already exists and if it belongs to another user
            if (user && user._id.toString() !== req.user.userId) {
                throw new BadRequestError('email already exists');
            }
        }),
    body('location')
        .notEmpty()
        .withMessage('location is required'),
    body('lastName')
        .notEmpty()
        .withMessage('last name is required'),
]);

