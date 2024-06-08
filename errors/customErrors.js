// Importing the StatusCodes from http-status-codes
import { StatusCodes } from "http-status-codes";

// Custom Error class for Not Found Error
export class NotFoundError extends Error {
    constructor(message) {
        super(message); // Calling the parent class constructor
        this.name = 'NotFoundError'; // Setting the name of the error
        this.statusCode = StatusCodes.NOT_FOUND; // Setting the status code for the error
    }
}

// Custom Error class for Bad Request Error
export class BadRequestError extends Error {
    constructor(message) {
        super(message); // Calling the parent class constructor
        this.name = 'BadRequestError'; // Setting the name of the error
        this.statusCode = StatusCodes.BAD_REQUEST; // Setting the status code for the error
    }
}

// Custom Error class for Unauthenticated Error
export class UnauthenticatedError extends Error {
    constructor(message) {
        super(message); // Calling the parent class constructor
        this.name = 'UnauthenticatedError'; // Setting the name of the error
        this.statusCode = StatusCodes.UNAUTHORIZED; // Setting the status code for the error
    }
}

// Custom Error class for Unauthorized Error
export class UnauthorizedError extends Error {
    constructor(message) {
        super(message); // Calling the parent class constructor
        this.name = 'UnauthorizedError'; // Setting the name of the error
        this.statusCode = StatusCodes.FORBIDDEN; // Setting the status code for the error
    }
}