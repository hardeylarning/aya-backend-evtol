import jwt from "jsonwebtoken"

const generateToken = (id, role) => {
    return jwt.sign(
        {id, role}, process.env.JWT_KEY, 
        {expiresIn: process.env.JWT_EXPIRATION_TIME}
    )
}

export default generateToken;