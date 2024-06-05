import {BadRequestError, UnauthenticatedError} from "../errors/customErrors.js";
import {verifyJWT} from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {

    // Check if the token is in the cookies
    const { token } = req.cookies;
    if (!token) throw new UnauthenticatedError('Authentication invalid');

    // Verify the token (If it is valid) grab the user id and role
    try{
        const {userId, role } = verifyJWT(token);
        // Check if the user is a test user
        const testUser = userId === '666031c8358d221fe089ba16'

        req.user = { userId, role, testUser };

        next()
    }catch (e) {
        throw new UnauthenticatedError('Authentication invalid')
    }

}

export const authorizePermissions = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthenticatedError('Unauthorized access')
        }
        next()
    }

}

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) {
        throw new BadRequestError('Demo User Read-Only')
    }
    next()
}