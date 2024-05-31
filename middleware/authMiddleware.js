import {UnauthenticatedError} from "../errors/customErrors.js";
import {verifyJWT} from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {

    // Check if the token is in the cookies
    const { token } = req.cookies;
    if (!token) throw new UnauthenticatedError('Authentication invalid');

    // Verify the token (If it is valid) grab the user id and role
    try{
        const {userId, role } = verifyJWT(token);
        req.user = { userId, role };

        next()
    }catch (e) {
        throw new UnauthenticatedError('Authentication invalid')
    }

}