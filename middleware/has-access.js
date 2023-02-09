import { getTokenFromHeader } from "../util/jwt/get-token.js"
import { verifyToken } from "../util/jwt/verify-token.js"

export const hasAccess = (req, res, next) => {
    // get token from header
    const token = getTokenFromHeader(req)
    if(!token) return res.json({
        status: "error",
        message: "It seems there was no token attached to the header!"
    })

    const decodedUser = verifyToken(token);
    req.role = decodedUser.role

    if (!decodedUser || decodedUser.role !== 'Admin') {
        return res.json({
            status: "error",
            message: "you do not have access to this endpoint."
        })
        
    }
        next();
}