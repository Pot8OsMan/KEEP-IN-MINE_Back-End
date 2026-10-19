import jwt from 'jsonwebtoken'

export const generateToken = (userID, res) => {
    const payload = { id: (userID)};
    
    // const crypto = require('crypto');

    // // Generates a cryptographically strong 32-byte secret key
    // const jwtSecret = crypto.randomBytes(32).toString('base64');

    const token = jwt.sign( payload, /*jwtSecret*/ process.env.JWT_SECRET, { 
        expiresIn:  process.env.JWT_EXPIRES_IN || "7d" /*default*/,
    });
    
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: (1000 * 60 * 60 * 24) * 5 // Expire date
    })

    return token;
};