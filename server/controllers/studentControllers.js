import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./server/.env" });

const fetchUrl = `http://localhost:${process.env.PORT}`;
// const fetchUrl = "https://education-elevate.onrender.com";

export const handleLogin = async (req, res) => {
    // pull all students from database
    const data = await fetch(`${fetchUrl}/students`);
    const users = await data.json();

    const usersDB = {
        users: users,
    };

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email/password required..." });
    }

    // check if email from request body is in database
    const foundUser = usersDB.users.find((user) => user.email === email);

    if (!foundUser) {
        return res.status(400).end();
    }

    // check if password from request body matches password for found user
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
        // create jwt
        const accessToken = jwt.sign({ email: foundUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

        const refreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d",
        });

        // store refresh token in database
        await fetch(`${fetchUrl}/students/${foundUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            // mode: "cors"
            body: JSON.stringify({ jwt: refreshToken }),
        });

        // send refreshToken to http-only cookie
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        }); // maxAge: one day

        res.json({ accessToken, id: foundUser.id });
    } else {
        res.status(401).end();
    }
};

export const handleLogout = async (req, res) => {
    // get id of logged in student
    const { id } = req.body;

    try {
        // clear student's jwt in db
        await fetch(`${fetchUrl}/students/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ jwt: null }),
        });

        // clear jwt cookie (set cookie to null and have it expire immediately)
        res.cookie("jwt", null, {
            httpOnly: true,
            maxAge: 0,
        });

        res.end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const handleRefreshToken = async (req, res) => {
    // pull all students from database
    const data = await fetch(`${fetchUrl}/students`);
    const users = await data.json();

    const usersDB = {
        users: users,
    };

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(401).end();
    }

    const refreshToken = cookies.jwt;

    // check if email from request body is in database
    const foundUser = usersDB.users.find((user) => user.jwt === refreshToken);

    if (!foundUser) {
        return res.status(403).end();
    }

    // evaluate jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser.email !== decoded.email) {
            return res.status(403).end();
        }

        const accessToken = jwt.sign({ email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

        res.json({ accessToken });
    });
};
