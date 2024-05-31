import {body, validationResult} from "express-validator";
import {BadRequestError, NotFoundError} from "../errors/customErrors.js";
import {JOB_STATUS, JOB_TYPE} from "../utils/constants.js";
import mongoose from 'mongoose';
import { param } from 'express-validator';
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";


const withValidationErrors = (validateValues) => {
    return [validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                if(errorMessages[0].startsWith('Job not')){
                    throw new NotFoundError(errorMessages);
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
        .custom(async (value) => {
            const isValidId = mongoose.Types.ObjectId.isValid(value);
            if (!isValidId) throw new BadRequestError('invalid MongoDB id');
            const job = await Job.findById(value);
            if (!job) throw new NotFoundError(`Job not found with id: ${value}`);


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

