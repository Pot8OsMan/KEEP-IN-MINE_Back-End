import jwt from 'jsonwebtoken'

export const generateToken = (userID) => {
    const payload = { id: (userID)};
    
    // const crypto = require('crypto');

    // // Generates a cryptographically strong 32-byte secret key
    // const jwtSecret = crypto.randomBytes(32).toString('base64');

    const token = jwt.sign( payload, /*jwtSecret*/ process.env.JWT_SECRET, 
        { 
            expiresIn:  process.env.JWT_EXPIRES_IN || "7d" /*default*/,
        });

    return token;
};