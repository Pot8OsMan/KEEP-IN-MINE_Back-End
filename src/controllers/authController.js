import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

import { generateToken } from "../utils/generateJWTToken.js";

const register = async (req,res) => {
    const { username, email, password } = req.body;

    const checkUserExists = await prisma.user.findUnique({
        where: {email: email},
    });

    if(checkUserExists) {
        return res
            .status(400)
            .json({error: "User already exists with this email."})
    }

    //  Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  Create user
    const user = await prisma.user.create({
        data: {
            username,
            email,
            passwordHash: hashedPassword,
        },
    });

    // Generate JWT Token
    const token = generateToken(user.id);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                username: username,
                email: email,
            },
            token,
        },
    });
};

const login = async (req,res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ // same logic as register [oh maii gotto soo smart ToT]
        where: {email: email},
    });

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if(!user || !isValidPassword) {
        return res
            .status(401)
            .json({error: "Invalid email or password."});
        // Returning the same error code will ensure that
        // there will be no way for unauthenticated user to guess
        // if either the email or password is correct, accuracy is security!
    };

    // Generate JWT Token
    const token = generateToken(user.id);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: email,
                // passwordHash: user.passwordHash // Only for testing
            },
            token,
        },
    });
};


export {register, login}