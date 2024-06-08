// Importing the custom errors and the JWT verification utility
import {BadRequestError, UnauthenticatedError} from "../errors/customErrors.js";
import {verifyJWT} from "../utils/tokenUtils.js";

// Middleware to authenticate the user
export const authenticateUser = async (req, res, next) => {

    // Check if the token is in the cookies
    const { token } = req.cookies;
    // If no token is found, throw an UnauthenticatedError
    if (!token) throw new UnauthenticatedError('Authentication invalid');

    // Verify the token (If it is valid) grab the user id and role
    try{
        const {userId, role } = verifyJWT(token);
        // Check if the user is a test user
        const testUser = userId === '666031c8358d221fe089ba16'

        // Attach the user details to the request object
        req.user = { userId, role, testUser };

        // Proceed to the next middleware
        next()
    }catch (e) {
        // If the token verification fails, throw an UnauthenticatedError
        throw new UnauthenticatedError('Authentication invalid')
    }

}

// Middleware to authorize user permissions based on roles
export const authorizePermissions = (...roles) => {

    return (req, res, next) => {
        // If the user's role is not included in the roles array, throw an UnauthenticatedError
        if (!roles.includes(req.user.role)) {
            throw new UnauthenticatedError('Unauthorized access')
        }
        // Proceed to the next middleware
        next()
    }

}

// Middleware to check for a test user
export const checkForTestUser = (req, res, next) => {
    // If the user is a test user, throw a BadRequestError
    if (req.user.testUser) {
        throw new BadRequestError('Demo User Read-Only')
    }
    // Proceed to the next middleware
    next()
}