import jwt from 'jsonwebtoken';

// Create a token
export const createJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return token;
}


/*
* Decode a token
* (NOT DECODED IN THE FRONTEND, ONLY IN THE BACKEND)
* We send the token to the frontend, then the frontend will send it back
* with every request since the JWT will be located in the cookie and
* in the server we will decode it to get the user's information
* */
export const verifyJWT = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}