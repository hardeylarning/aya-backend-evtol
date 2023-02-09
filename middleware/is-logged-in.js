import { getTokenFromHeader } from "../util/jwt/get-token.js"
import { verifyToken } from "../util/jwt/verify-token.js"

export const isLoggedIn = (req, res, next) => {
    // get token from header
    const token = getTokenFromHeader(req)
    if(!token) return res.json({
        status: "error",
        message: "It seems there was no token attached to the header!"
    })

    const decodedUser = verifyToken(token);
    req.userAuth = decodedUser.id

    if (!decodedUser) {
        return res.json({
            status: "error",
            message: "Invalid token passed! Kindly login to generate new token thank you."
        })
        
    }
        next();
}