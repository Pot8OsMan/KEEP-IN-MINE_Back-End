import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

export const authMiddleWare = async (req, res, next) => {
    console.log("Auth middleware reached!");

    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if ( req.cookies?.jwt ) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ error: "Not authorized, no token provided." });
    }

    try {
        // Verify token and extract userId
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decodedToken.id },
        });

        if (!user) {
            return res.status(401).json({ error: "User no longer exists" });
        }

        req.user = user;
        next();
    }
    catch(err) {
        return res.status(401).json({ error: "Authorization failed, token not valid" });
    }
};